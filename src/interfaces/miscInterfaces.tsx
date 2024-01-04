import { Color, Evolution_chain, Flavor_text_entry } from "./pokemonSpeciesInterface";
import { Ability, Mfe, Stat, Type } from "./pokemonInterface";

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
    black: string;
    white: string;
}

export interface PokemonTypesPropsInterface {
    typeName: string;
    dynamicBackground?: boolean;
}

export interface PokemonProfilesNavElementsInterface {
    About: { isFocused: boolean; element?: React.ReactElement };
    "Base Stats": { isFocused: boolean; element?: React.ReactElement };
    Evolution: { isFocused: boolean; element?: React.ReactElement };
    Moves: { isFocused: boolean; element?: React.ReactElement };
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

export interface PokemonProfilePropsInterface {
    id: number;
    AboutProps: AboutComponentProps;
    BaseStatsProps: BaseStatsComponentProps;
    EvolutionProps: EvolutionComponentProps;
    MovesProps: MovesComponentProps;
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

export interface NavIconsInterface {
    name: string;
    icon: string;
    linkUrl: string;
}

export interface profileTabsPropsInterface {
    AboutProps: {
        flavor_text_entries: Flavor_text_entry[];
        height: number;
        weight: number;
        color: Color;
        types: Type[];
        abilities: Ability[];
    };
    BaseStatsProps: {
        stats: Stat[];
    };
    EvolutionProps: {
        evolution_chain: Evolution_chain;
    };
    MovesProps: {
        moves: Mfe[];
    };
}

export interface FilterInfoInterface {
    type: FilterInfoPropInterface;
    type2: FilterInfoPropInterface;
    height: FilterNumberPropInterface;
    weight: FilterNumberPropInterface;
    generation: FilterNumberPropInterface;
}

export interface FilterInfoNumInterface {
    height: FilterNumberPropInterface;
    weight: FilterNumberPropInterface;
}

export interface FilterInfoPropInterface {
    name: string;
    /* value: string | undefined; */
    style: string;
}
export interface FilterNumberPropInterface {
    name: string;
    /*  value: number; */
    style: string;
}

export interface CustomPokemonInfo {
    name: string;
    id: number;
    types: Type[];
    height: number;
    weight: number;
}

export interface PokemonGenerationsListInterface {
    generation: string;
    numerals: string;
}
