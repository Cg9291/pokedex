import axios from "axios";
import { PokemonInterface, Type } from "../../../interfaces/pokemonInterface";
import { endpointsUrls } from "../../../objects/endpointsUrls";

export async function getPokemonNameAndTypes(
    pokemonIdentifier: number | string
): Promise<{ name: string; id: number; types: Type[] }> {
    try {
        const response = await axios.get(endpointsUrls.pokemon(pokemonIdentifier));
        const responseData: PokemonInterface = response.data;
        const { name, id, types } = responseData;
        // console.log("nt", { name, types });
        return { name, id, types };
    } catch (err) {
        console.log("function getPokemonData:failure", err);
        throw err;
    }
}
