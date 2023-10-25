import axios from "axios";
import { PokemonMovesInterface } from "../../interfaces/pokemonMovesInterface";

const getPokemonMovesTypesData = async (url: string): Promise<PokemonMovesInterface> => {
    try {
        const response = await axios.get(url);
        const movesTypesData: PokemonMovesInterface = response.data;
        return movesTypesData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default getPokemonMovesTypesData;
