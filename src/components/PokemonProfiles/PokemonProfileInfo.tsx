import { useContext } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import PokemonProfileNavElement from "./PokemonProfileNavElement.tsx";
/* import { PokemonProfilesNavElementsInterface } from "../../interfaces&types/misc_Interfaces.tsx";
import BaseStats from "./profileNavBodies/BaseStats.tsx";
import About from "./profileNavBodies/About.tsx";
import Moves from "./profileNavBodies/Moves.tsx";
import Evolution from "./profileNavBodies/Evolution.tsx"; */
import ComponentContext from "../../contexts/componentContext.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	z-index: 1;
	height: 62%;
	top: 38%;
	background-color: white;
	position: absolute;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	overflow-y: scroll;
`;

const InfoNavBar = styled(ContainerPrototype)`
	position: fixed;
	background-color: white;
	height: 3rem;
	padding: 0 1rem;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	align-items: flex-start;
`;

const InfoNavBody = styled(ContainerPrototype)`
	height: max-content;
	padding: 1rem;
`;

export default function PokemonProfileInfo(): JSX.Element {
	const myComponentContext = useContext(ComponentContext);
	const navElementsNames: string[] = [
		"About",
		"Base Stats",
		"Evolution",
		"Moves",
	];

	const mapObjectToComponent = (): JSX.Element[] =>
		Object.keys(navElementsNames).map(
			(key: string): JSX.Element => <PokemonProfileNavElement value={key} />,
		);

	return (
		<Container>
			<InfoNavBar>{mapObjectToComponent()}</InfoNavBar>
			<InfoNavBody>{myComponentContext?.element}</InfoNavBody>
		</Container>
	);
}
