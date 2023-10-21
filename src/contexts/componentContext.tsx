import React, { createContext } from "react";
import About from "../components/PokemonProfiles/profileNavBodies/About.tsx";

const ComponentContext = createContext<
	{ name: string; element: JSX.Element } | undefined
>({ name: "about", element: <About /> });

export default ComponentContext;
