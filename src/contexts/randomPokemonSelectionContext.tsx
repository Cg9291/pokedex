import { createContext } from "react";
import { RandomPokemonSelectionInterface } from "../interfacesAndTypes/miscInterfaces.tsx";

const RandomPokemonSelectionContext =
	createContext<RandomPokemonSelectionInterface>({
		randomPokemonSelection: [],
	});

export default RandomPokemonSelectionContext;
