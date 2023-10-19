import { createContext } from "react";
import { RandomPokemonSelectionInterface } from "../interfaces&types/misc_Interfaces.tsx";
import pokemonLookupNumber from "../functions/utilities/randomizePokemonSelection.tsx";

const RandomPokemonSelectionContext = createContext<
	RandomPokemonSelectionInterface
>({randomPokemonSelection:[0]});

export default RandomPokemonSelectionContext;
