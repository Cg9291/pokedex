export interface PokemonInfoInt {
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
	types: { [key: string]: {} }[];
	weight: number;
}

export interface PokemonNumberInt {
	id: number;
}

export interface PokemonProfilesNavElementsInt {
	About: { isFocused: boolean; element: JSX.Element };
	"Base Stats": { isFocused: boolean; element: JSX.Element };
	Evolution: { isFocused: boolean; element: JSX.Element };
	Moves: { isFocused: boolean; element: JSX.Element };
}
