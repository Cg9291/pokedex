import { createContext } from "react";
import { ObjectPlaceHolderInterface, VitalsInterface } from "../interfaces/miscInterfaces";

const VitalsContext = createContext<VitalsInterface | ObjectPlaceHolderInterface>({});

export default VitalsContext;
