import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

const PokemonFetcher: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((response) => {
        setPokemon(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  }, []); // Пустой массив зависимостей для вызова один раз

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {pokemon ? (
        <div>
          <h1>{pokemon.name} (ID: {pokemon.id})</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonFetcher;
