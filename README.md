# MUSstorage

Это небольшой проект, который включает в себя функционал логина, регистрации и сброса пароля

## Примечание

Если вы хотите увидеть функционал, то вам необходимо воспользоваться Google Devkit, который открывается нажатием на f12 (или fn+f12, если у вас спец. команды на обычное f12), или нажатием правой кнопки мыши, а затем Inspect

Учтите, что во время проверки функционала, скорее всего не будет работать API, потому что на момент создания проекта был использован ``npm run server``. Будет работать исключительно Redux, но будут так же возникать ошибки, в связи с тем, что в функционале Redux прописаны фетчи на апи (см. ``usersSlice.tsx``)
