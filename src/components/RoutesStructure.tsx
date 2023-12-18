import React from "react";
import { useRoutes } from "react-router-dom";
import { PokemonProfile } from "../pages/PokemonProfile";
import { Homepage } from "../pages/Homepage";
import { NoMatch } from "../pages/NoMatch";
import { Favorites } from "../pages/Favorites";
import { PokemonNotFound } from "../pages/PokemonNotFound";
import { FilteredSearchModal } from "../pages/FilteredSearch";
import { FilteredSearchResults } from "../pages/FilteredSearchResults";
import { Comparator } from "../pages/Comparator";
import { PokemonGuess } from "../pages/PokemonGuess";

export function RoutesStructure(): React.ReactElement | null {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "*", element: <NoMatch /> },
        { path: "/pokemons/id/:id", element: <PokemonProfile /> },
        { path: "/pokemons/name/:name", element: <PokemonProfile /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/pokemon-not-found", element: <PokemonNotFound /> },
        { path: "/filter/:gen", element: <FilteredSearchModal /> },
        { path: "/wtp", element: <PokemonGuess /> },
        {
            path: "/filtered-search/*",
            element: <FilteredSearchResults />
        },
        {
            path: "/comparator",
            element: <Comparator />
        }
    ]);
}
