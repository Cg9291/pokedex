import { useRoutes } from "react-router-dom";
import PokemonProfile from "./PokemonProfiles/PokemonProfile.tsx";
import Homepage from "../pages/Homepage.tsx";
import About from "./PokemonProfiles/profileNavBodies/About.tsx";
import NoMatch from "../pages/NoMatch.tsx";
import WTP from "../pages/Wtp.tsx";
import Favorites from "../pages/Favorites.tsx";
import Evolution from "./PokemonProfiles/profileNavBodies/Evolution.tsx";
import Moves from "./PokemonProfiles/profileNavBodies/Moves.tsx";
import BaseStats from "./PokemonProfiles/profileNavBodies/BaseStats.tsx";

export default function MapPathsToElement(): React.ReactElement | null {
	return useRoutes([
		{ path: "/", element: <Homepage /> },
		{ path: "*", element: <NoMatch /> },
		{
			path: "/pokemons/id/:id/",
			children: [
				{
					path: "About",
					element: (
						<PokemonProfile body={{ name: "About", element: <About /> }} />
					),
				},
				{
					path: "Evolution",
					element: (
						<PokemonProfile
							body={{ name: "Evolution", element: <Evolution /> }}
						/>
					),
				},
				{
					path: "Moves",
					element: (
						<PokemonProfile body={{ name: "Moves", element: <Moves /> }} />
					),
				},
				{
					path: "Base Stats",
					element: (
						<PokemonProfile
							body={{ name: "Base Stats", element: <BaseStats /> }}
						/>
					),
				},
			],
		},
		{
			path: "/pokemons/name/:name",
			children: [
				{
					path: "About",
					element: (
						<PokemonProfile body={{ name: "About", element: <About /> }} />
					),
				},
				{
					path: "Evolution",
					element: (
						<PokemonProfile
							body={{ name: "Evolution", element: <Evolution /> }}
						/>
					),
				},
				{
					path: "Moves",
					element: (
						<PokemonProfile body={{ name: "Moves", element: <Moves /> }} />
					),
				},
				{
					path: "Base Stats",
					element: (
						<PokemonProfile
							body={{ name: "Base Stats", element: <BaseStats /> }}
						/>
					),
				},
			],
		},
		{ path: "/favorites", element: <Favorites /> },
		{ path: "/wtp", element: <WTP /> },
	]);
}
