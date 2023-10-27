import axios from "axios";
import { PokemonSpeciesInterface } from "../../../interfaces/pokemonSpeciesInterface";
import { endpointsUrls } from "../../../objects/endpointsUrls";
import { NumOrString } from "../../../interfaces/miscTypes";

export async function getPokemonSpeciesData(id: NumOrString): Promise<PokemonSpeciesInterface> {
    try {
        const response = await axios.get(endpointsUrls.pokemonSpecies(id));
        const pokemonSpeciesData: PokemonSpeciesInterface = response.data;
        return pokemonSpeciesData;
    } catch (err) {
        console.log("function getPokemonSpeciesData:failure", err);
        throw err;
    }
}
