import { Sprites, Stat, Type } from "./pokemonInterface";
export interface ComparatorPokemonInfoInterface {
    name: string;
    id: number;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
}

export interface ComparatorPokemonDataInterface {
    topPokemon: ComparatorPokemonInfoInterface;
    bottomPokemon: ComparatorPokemonInfoInterface;
}

export interface IsModalActiveInterface {
    isActive: boolean;
    activeImageNumber: number;
}

export interface ComparatorPokemonCardsPropsInterface {
    pokemonData: ComparatorPokemonInfoInterface;
    imgOrder: number;
    isCompared?: boolean;
    setIsModalActive: React.Dispatch<React.SetStateAction<IsModalActiveInterface>>;
}
