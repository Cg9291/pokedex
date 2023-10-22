import { useRoutes, Outlet } from "react-router-dom";
import PokemonProfile from "./pokemonProfile/PokemonProfile.tsx";
import Homepage from "../pages/Homepage.tsx";
import About from "./pokemonProfile/profileNavBodies/About.tsx";
import NoMatch from "../pages/NoMatch.tsx";
import WTP from "../pages/Wtp.tsx";
import Favorites from "../pages/Favorites.tsx";
import Evolution from "./pokemonProfile/profileNavBodies/Evolution.tsx";
import Moves from "./pokemonProfile/profileNavBodies/Moves.tsx";
import BaseStats from "./pokemonProfile/profileNavBodies/BaseStats.tsx";

export default function MapPathsToElement(): React.ReactElement | null {
	return useRoutes([
		{ path: "/", element: <Homepage /> },
		{ path: "*", element: <NoMatch /> },
		{
			path: "/pokemons/id/:id/",
			children: [
				{ path: "About", element: <PokemonProfile body={<About />} /> },
				{ path: "Evolution", element: <PokemonProfile body={<Evolution />} /> },
				{ path: "Moves", element: <PokemonProfile body={<Moves />} /> },
				{
					path: "Base Stats",
					element: <PokemonProfile body={<BaseStats />} />,
				},
			],
		},
		{
			path: "/pokemons/name/:name",
			children: [
				{ path: "About", element: <PokemonProfile body={<About />} /> },
				{ path: "Evolution", element: <PokemonProfile body={<Evolution />} /> },
				{ path: "Moves", element: <PokemonProfile body={<Moves />} /> },
				{
					path: "Base Stats",
					element: <PokemonProfile body={<BaseStats />} />,
				},
			],
		},
		{ path: "/favorites", element: <Favorites /> },
		{ path: "/wtp", element: <WTP /> },
	]);
}
