import axios from "axios";
import { PokemonInterface, Type } from "../../../interfaces/pokemonInterface";
import { endpointsUrls } from "../../../objects/endpointsUrls";

export async function getPokemonNameAndTypes(
    pokemonIdentifier: number | string
): Promise<{ name: string; types: Type[] }> {
    try {
        const response = await axios.get(endpointsUrls.pokemon(pokemonIdentifier));
        const responseData: PokemonInterface = response.data;
        const { name, types } = responseData;
        console.log("nt", { name, types });
        return { name, types };
    } catch (err) {
        console.log("function getPokemonData:failure", err);
        throw err;
    }
}
