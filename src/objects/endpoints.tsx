import { NumOrString } from "../interfaces/miscTypes";

export const endpoints: {
    pokemon: (id: NumOrString) => string;
    pokemonList: (limit: number) => string;
    pokemonSpecies: (id: NumOrString) => string;
    generations: (generation: NumOrString) => string;
    sprite: (id: string) => string;
} = {
    pokemon: (id: NumOrString) => `https://pokeapi.co/api/v2/pokemon/${id}`,
    pokemonList: (limit: number) => `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
    pokemonSpecies: (id: NumOrString) => `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    generations: (generation: NumOrString) => `https://pokeapi.co/api/v2/generation/${generation}`,
    sprite: (id: string) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
};
