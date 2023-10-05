import { useRoutes } from "react-router-dom";
import PokemonProfile from "./Homepage/pokemonProfiles/PokemonProfile.tsx";
import Homepage from "../pages/Homepage.tsx";
import About from "./About.tsx";
import NoMatch from "../pages/NoMatch.tsx";

export default function MapPathsToElement(/* props: {
	routes: string[];
	component: JSX.Element;
} */): React.ReactElement | null {
	// const { routes, component } = props;

	/* return useRoutes(routes.map((path: string) => ({ path, component }))); */
	return useRoutes([
		{ path: "/", element: <Homepage /> },
		{ path: "/about", element: <About /> },
		{ path: "*", element: <NoMatch /> },
		{ path: "/pokemons/:id", element: <PokemonProfile /> },
		{ path: "/pokemons/:name", element: <PokemonProfile /> },
	]);
}
