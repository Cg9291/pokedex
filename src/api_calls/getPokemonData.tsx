import axios from "axios";

export default function getPokemonData(
	id: number,
	stateSetter: React.Dispatch<React.SetStateAction<{}>>,
): Promise<void> {
	interface PokemonInfo {
		abilities: {}[];
		//(2) [{…}, {…}]
		base_experience: number;
		//112
		forms: {}[];
		// [{…}]
		game_indices: {}[];
		// (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
		height: number;
		//4
		held_items: {}[];
		//(2) [{…}, {…}]
		id: number;
		//25
		is_default: boolean;
		//true
		location_area_encounters: string;
		//"https://pokeapi.co/api/v2/pokemon/25/encounters"
		moves: {}[];
		//(101) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
		name: string;
		//"pikachu"
		order: number;
		//35
		past_types: [];
		//[]
		species: { name: string; url: string };
		//{name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/'}
		sprites: { [key: string]: any };
		// {back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png', back_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png', back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png', back_shiny_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png', front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', …}
		stats: {}[];
		//(6) [{…}, {…}, {…}, {…}, {…}, {…}]
		types: {}[];
		//[{…}]
		weight: number;
		//60
	}
	return axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res => {
			const parsedData: PokemonInfo = res.data;
			stateSetter(prevObj => ({ ...prevObj, parsedData }));
			//console.log(parsedData);
		})
		.catch(err => {
			console.log("Failure", err);
		})
		.finally(() => console.log("Done")); //just here for learning purpose
}
