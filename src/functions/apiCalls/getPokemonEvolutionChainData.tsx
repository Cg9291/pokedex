import axios from "axios";
import PokemonEvolutionChainInterface from "../../interfacesAndTypes/pokemonEvolutionChainInterface.tsx";

const getPokemonEvolutionChainData = async (
	url: string,
): Promise<PokemonEvolutionChainInterface> => {
	try {
		const response = await axios.get(url);
		console.log("evolutionchain", response.data);
		const evolutionData: PokemonEvolutionChainInterface = response.data;
		return evolutionData;
	} catch (err) {
		throw err;
	}
};

export default getPokemonEvolutionChainData;
