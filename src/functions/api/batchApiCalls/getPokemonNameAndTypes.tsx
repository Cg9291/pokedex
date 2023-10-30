import axios from "axios";
import { PokemonInterface } from "../../../interfaces/pokemonInterface";
import { endpointsUrls } from "../../../objects/endpointsUrls";
import { CustomPokemonInfo } from "../../../interfaces/miscInterfaces";

export async function getPokemonNameAndTypes(pokemonIdentifier: number | string): Promise<CustomPokemonInfo> {
    try {
        const response = await axios.get(endpointsUrls.pokemon(pokemonIdentifier));
        const responseData: PokemonInterface = response.data;
        const { name, id, types, height, weight }: CustomPokemonInfo = responseData;
        // console.log("nt", { name, types });
        return { name, id, types, height, weight };
    } catch (err) {
        console.log("function getPokemonData:failure", err);
        throw err;
    }
}
