import axios from "axios";
import { PokemonInterface } from "../../../interfaces/pokemonInterface";
import { endpoints } from "../../../objects/endpoints";
import { CustomPokemonInfo } from "../../../interfaces/miscInterfaces";

export async function getPokemonNameAndTypes(pokemonIdentifier: string): Promise<CustomPokemonInfo> {
    try {
        const response = await axios.get(endpoints.pokemon(pokemonIdentifier));
        const responseData: PokemonInterface = response.data;
        const { name, id, types, height, weight }: CustomPokemonInfo = responseData;
        return { name, id, types, height, weight };
    } catch (err) {
        console.log(err);
        throw err;
    }
}
