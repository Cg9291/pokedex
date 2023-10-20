import { createContext } from "react";
import { RandomPokemonSelectionInterface } from "../interfaces&types/misc_Interfaces.tsx";

const RandomPokemonSelectionContext =
	createContext<RandomPokemonSelectionInterface>({
		randomPokemonSelection: [],
	});

export default RandomPokemonSelectionContext;
