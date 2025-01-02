require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const fakeDatabase = [
    { id: '1', username: 'user1', password: '$2b$10$hashedPasswordExample' }, // Пароли должны быть захешированы
];

// Функция для генерации токена
function generateToken(userId) {
    const payload = { id: userId };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// Проверка токена
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Эндпоинт для логина
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = fakeDatabase.find((u) => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token });
});

// Защищённый маршрут
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
