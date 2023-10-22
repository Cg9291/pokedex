import { createContext } from "react";
import { VitalsInterface } from "../interfacesAndTypes/miscInterfaces.tsx";
import { ObjectPlaceHolderInterface } from "../interfacesAndTypes/miscInterfaces.tsx";

const VitalsContext = createContext<
	VitalsInterface | ObjectPlaceHolderInterface
>({});

export default VitalsContext;
