import { createContext } from "react";
import {
	EvolutionInterface,
	ObjectPlaceHolderInterface,
} from "../interfacesAndTypes/miscInterfaces.tsx";

const EvolutionChainContext = createContext<
	EvolutionInterface | ObjectPlaceHolderInterface
>({});

export default EvolutionChainContext;
