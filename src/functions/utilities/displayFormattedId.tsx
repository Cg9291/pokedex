export const displayFormattedId = (pokemonEvolutionId: number) => {
    return pokemonEvolutionId.toString().length === 3
        ? `#${pokemonEvolutionId}`
        : pokemonEvolutionId.toString().length === 2
        ? `#0${pokemonEvolutionId}`
        : `#00${pokemonEvolutionId}`;
};
