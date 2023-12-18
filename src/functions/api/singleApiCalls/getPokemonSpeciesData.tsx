import axios from "axios";
import { PokemonSpeciesInterface } from "../../../interfaces/pokemonSpeciesInterface";
import { endpoints } from "../../../objects/endpoints";
import { NumOrString } from "../../../interfaces/miscTypes";

export async function getPokemonSpeciesData(id: NumOrString): Promise<PokemonSpeciesInterface> {
    try {
        const response = await axios.get(endpoints.pokemonSpecies(id));
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
