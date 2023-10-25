import axios from "axios";
import PokemonEvolutionChainInterface from "../../interfaces/pokemonEvolutionChainInterface";

const getPokemonEvolutionChainData = async (url: string): Promise<PokemonEvolutionChainInterface> => {
    try {
        const response = await axios.get(url);
        console.log("evolutionchain", response.data);
        const evolutionData: PokemonEvolutionChainInterface = response.data;
        return evolutionData;
    } catch (err) {
        console.log(err); //review eslint rule that flags error when catch method only throws the error
        throw err;
    }
};

export default getPokemonEvolutionChainData;
