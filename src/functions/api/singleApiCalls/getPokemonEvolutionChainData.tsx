import axios from "axios";
import { PokemonEvolutionChainInterface } from "../../../interfaces/pokemonEvolutionChainInterface";

export const getPokemonEvolutionChainData = async (url: string): Promise<PokemonEvolutionChainInterface> => {
    try {
        const response = await axios.get(url);
        const evolutionData: PokemonEvolutionChainInterface = response.data;
        return evolutionData;
    } catch (err) {
        console.log(err); //review eslint rule that flags error when catch method only throws the error
        throw err;
    }
};
