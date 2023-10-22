import axios from "axios";
import PokemonSpeciesInterface from "../../interfacesAndTypes/pokemonSpeciesInterface.tsx";
import endpointsUrls from "../../objects/endpointsUrls.tsx";
import { NumOrString } from "../../interfacesAndTypes/miscTypes.tsx";

export default async function getPokemonSpeciesData(
	id: NumOrString,
): Promise<PokemonSpeciesInterface> {
	try {
		const response = await axios.get(endpointsUrls.pokemonSpecies(id));
		const pokemonSpeciesData: PokemonSpeciesInterface = response.data;
		return pokemonSpeciesData;
	} catch (err) {
		console.log("function getPokemonSpeciesData:success", err);
		throw err;
	}
}
