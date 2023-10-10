const endpointsUrls: {
	pokemon: (id: number | string) => string;
	pokemonSpecies: (id: number | string) => string;
} = {
	pokemon: (id: number | string) => `https://pokeapi.co/api/v2/pokemon/${id}`,
	pokemonSpecies: (id: number | string) =>
		`https://pokeapi.co/api/v2/pokemon-species/${id}`,
};

export default endpointsUrls;
