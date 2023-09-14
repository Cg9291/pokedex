import axios from "axios";

export default function getPokemonData(
	id: number,
	stateSetter: React.Dispatch<React.SetStateAction<{}>>,
): Promise<void> {
	interface PokemonInfo {
		abilities: {}[];
		base_experience: number;
		forms: {}[];
		game_indices: {}[];
		height: number;
		held_items: {}[];
		id: number;
		is_default: boolean;
		location_area_encounters: string;
		moves: {}[];
		name: string;
		order: number;
		past_types: [];
		species: { name: string; url: string };
		sprites: { [key: string]: any };
		stats: {}[];
		types: {}[];
		weight: number;
	}

	return axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res => {
			const parsedData: PokemonInfo = res.data;
			stateSetter(prevObj => ({ ...prevObj, ...parsedData }));
			//console.log(parsedData);
		})
		.catch(err => {
			console.log("Failure", err);
		})
		.finally(() => console.log("Done")); //just here for learning purpose
}
