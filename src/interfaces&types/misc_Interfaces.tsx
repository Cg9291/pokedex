import { Color, Flavor_text_entry } from "./pokemonSpeciesInterface.tsx";
import { Ability, Type } from "./pokemonInterface.tsx";

export interface TypesColorsInt {
	normal: string;
	fire: string;
	water: string;
	electric: string;
	grass: string;
	ice: string;
	fighting: string;
	poison: string;
	ground: string;
	flying: string;
	psychic: string;
	bug: string;
	rock: string;
	ghost: string;
	dragon: string;
	dark: string;
	steel: string;
	fairy: string;
}

export interface PokemonNumberPropsInterface {
	id: number;
}

export interface PokemonTypesPropsInterface {
	typeName: string;
}

export interface PokemonProfilesNavElementsInterface {
	About: { isFocused: boolean; element: JSX.Element };
	"Base Stats": { isFocused: boolean; element: JSX.Element };
	Evolution: { isFocused: boolean; element: JSX.Element };
	Moves: { isFocused: boolean; element: JSX.Element };
}

export interface StatsInterface {
	base_stat: number;
	effort: number;
	stat: { name: string; url: string };
}

export interface ObjectPlaceHolderInterface {
	[key: string]: any;
}

export interface VitalsInterface {
	height: number;
	weight: number;
	color: Color;
	types: Type[];
	abilities: Ability[];
	flavor_text_entries: Flavor_text_entry;
}

export interface EvolutionInterface {
	url: string;
}
