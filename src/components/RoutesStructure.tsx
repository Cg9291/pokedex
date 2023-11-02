import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { PokemonProfile } from "../pages/PokemonProfile";
import { Homepage } from "../pages/Homepage";
import { NoMatch } from "../pages/NoMatch";
import { Wtp } from "../pages/Wtp";
import { Favorites } from "../pages/Favorites";
import { PokemonNotFound } from "../pages/PokemonNotFound";
import { FilteredSearchModal } from "./homepage/FilteredSearchModal";
import { FilteredSearchResults } from "../pages/filteredSearchResults";
import { stat } from "fs";

export function RoutesStructure(): React.ReactElement | null {
    const { state } = useLocation();
    const buildUrl = () => {
        const myArr = [`/filtered-search/`];
        for (const x in state) {
            myArr.push(`${x}/${state[x as keyof typeof state]}/`);
        }
        console.log("js", myArr.join(""));
        //setUrl(myArr.join(""));
        return myArr.join("");
    };

    console.log("state", state);

    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "*", element: <NoMatch /> },
        { path: "/pokemons/id/:id", element: <PokemonProfile /> },
        { path: "/pokemons/name/:name", element: <PokemonProfile /> },
        { path: "/wtp", element: <Wtp /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/pokemon-not-found", element: <PokemonNotFound /> },
        { path: "/filter/:gen", element: <FilteredSearchModal /> },
        {
            path: "/filtered-search/*",
            element: <FilteredSearchResults />
        }
    ]);
}
