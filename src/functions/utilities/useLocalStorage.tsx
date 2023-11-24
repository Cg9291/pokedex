import { useState, useEffect } from "react";

function getStorageValue(pokemonId: string) {
    const saved = localStorage.getItem(pokemonId);
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || "[]";
}

export function getFavoritedPokemons() {
    return JSON.parse(localStorage.getItem("pokemons") || "[]");
}

export const remove

export const addFavoritePokemon = (id: number) => {
    const favoritedPokemons = getFavoritedPokemons();
    const pokemonId = id.toString();
    favoritedPokemons.push(pokemonId);

    localStorage.setItem("pokemons", JSON.stringify(favoritedPokemons));
    console.log("in list", getFavoritedPokemons());
    // const [value, setValue] = useState(() => {
    //     return getStorageValue(pokemonId);
    // });

    // useEffect(() => {
    //     // storing input name
    //     localStorage.setItem(pokemonId, JSON.stringify(value));
    // }, [id]);

    // return [value, setValue];
};
