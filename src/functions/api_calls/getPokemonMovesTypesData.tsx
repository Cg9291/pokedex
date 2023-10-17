import axios from "axios";
import { PokemonMovesInterface } from "../../interfaces&types/pokemonMovesInterface.tsx";

const getPokemonMovesTypesData = async (
	url: string,
): Promise<PokemonMovesInterface> => {
	try {
		const response = await axios.get(url);
		const movesTypesData: PokemonMovesInterface = response.data;
		return movesTypesData;
	} catch (err) {
		throw err;
	}
};

export default getPokemonMovesTypesData;
