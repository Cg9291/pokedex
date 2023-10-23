import { useRoutes } from "react-router-dom";
import PokemonProfile from "./pokemonProfiles/PokemonProfile";
import Homepage from "../pages/Homepage";
import About from "./pokemonProfiles/profileNavBodies/About";
import NoMatch from "../pages/NoMatch";
import Wtp from "../pages/Wtp";
import Favorites from "../pages/Favorites";

export default function RoutesStructure(): React.ReactElement | null {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/about", element: <About /> },
        { path: "*", element: <NoMatch /> },
        { path: "/pokemons/id/:id", element: <PokemonProfile /> },
        { path: "/pokemons/name/:name", element: <PokemonProfile /> },
        { path: "/wtp", element: <Wtp /> },
        { path: "/favorites", element: <Favorites /> }
    ]);
}
