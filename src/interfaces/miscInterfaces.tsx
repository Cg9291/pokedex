import { Color, Evolution_chain, Flavor_text_entry } from "./pokemonSpeciesInterface";
import { Ability, Mfe, Stat, Type } from "./pokemonInterface";
import React from "react";

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
    About: { isFocused: boolean; element: React.ReactElement };
    "Base Stats": { isFocused: boolean; element: React.ReactElement };
    Evolution: { isFocused: boolean; element: React.ReactElement };
    Moves: { isFocused: boolean; element: React.ReactElement };
}

export interface StatsInterface {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
}

export interface VitalsInterface {
    height: number;
    weight: number;
    color: Color;
    ability: Ability[];
    flavor_text_entries: Flavor_text_entry;
}

export interface AboutComponentProps {
    flavor_text_entries: Flavor_text_entry[];
    height: number;
    weight: number;
    color: Color;
    types: Type[];
    abilities: Ability[];
}

export interface BaseStatsComponentProps {
    stats: Stat[];
}

export interface EvolutionComponentProps {
    evolution_chain: Evolution_chain;
}

export interface MovesComponentProps {
    moves: Mfe[];
}

export interface RandomPokemonSelectionInterface {
    randomPokemonSelection?: number[];
    setRandomPokemonSelection: React.Dispatch<React.SetStateAction<number[]>>;
}
