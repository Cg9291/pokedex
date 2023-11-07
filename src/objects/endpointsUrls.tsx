import { NumOrString } from "../interfaces/miscTypes";

export const endpointsUrls: {
    pokemon: (id: NumOrString) => string;
    pokemonSpecies: (id: NumOrString) => string;
    generations: (generation: NumOrString) => string;
} = {
    pokemon: (id: NumOrString) => `https://pokeapi.co/api/v2/pokemon/${id}`,
    pokemonSpecies: (id: NumOrString) => `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    generations: (generation: NumOrString) => `https://pokeapi.co/api/v2/generation/${generation}`
};
