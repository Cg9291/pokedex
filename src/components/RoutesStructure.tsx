import { useRoutes } from "react-router-dom";
import PokemonProfile from "./pokemonProfiles/PokemonProfile";
import Homepage from "../pages/Homepage";
import NoMatch from "../pages/NoMatch";
import Wtp from "../pages/Wtp";
import Favorites from "../pages/Favorites";

export default function RoutesStructure(): React.ReactElement | null {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "*", element: <NoMatch /> },
        { path: "/pokemons/id/:id", element: <PokemonProfile /> },
        { path: "/pokemons/name/:name", element: <PokemonProfile /> },
        { path: "/wtp", element: <Wtp /> },
        { path: "/favorites", element: <Favorites /> }
    ]);
}