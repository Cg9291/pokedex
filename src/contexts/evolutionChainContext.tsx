import { createContext } from "react";
import { EvolutionInterface, ObjectPlaceHolderInterface } from "../interfaces&types/misc_Interfaces.tsx";

const EvolutionChainContext = createContext<
	EvolutionInterface | ObjectPlaceHolderInterface
>({});

export default EvolutionChainContext;
