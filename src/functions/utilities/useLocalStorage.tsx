export function getFavoritedPokemons() {
    return JSON.parse(localStorage.getItem("pokemons") || "[]");
}

export function isPokemonFavorited(id: number): boolean {
    const favoritedPokemons = getFavoritedPokemons();
    const pokemonId = id.toString();
    return favoritedPokemons.includes(pokemonId);
}
export function removePokemonFromFavorites(id: number) {
    const favoritedPokemons = getFavoritedPokemons();
    const pokemonId = id.toString();
    const index = favoritedPokemons.indexOf(pokemonId);
    if (index > -1) {
        favoritedPokemons.splice(index, 1);
    }
    localStorage.setItem("pokemons", JSON.stringify(favoritedPokemons));
}

export const addFavoritePokemon = (id: number) => {
    const favoritedPokemons = getFavoritedPokemons();
    const pokemonId = id.toString();
    favoritedPokemons.push(pokemonId);
    localStorage.setItem("pokemons", JSON.stringify(favoritedPokemons));
};
