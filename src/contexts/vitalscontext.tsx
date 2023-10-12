import { createContext } from "react";
import { VitalsInterface } from "../interfaces&types/misc_Interfaces.tsx";
import { ObjectPlaceHolderInterface } from "../interfaces&types/misc_Interfaces.tsx";

const VitalsContext = createContext<
	VitalsInterface | ObjectPlaceHolderInterface
>({});

export default VitalsContext;
