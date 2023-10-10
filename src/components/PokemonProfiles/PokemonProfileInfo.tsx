import { useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import NavElement from "./NavElement.tsx";
import { PokemonProfilesNavElementsInt } from "../../interfaces&types/interfaces.tsx";
import BaseStats from "./BaseStats.tsx";
import About from "./About.tsx";
import Moves from "../Moves.tsx";
import Evolution from "../Evolution.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	z-index: 1;
	height: 62%;
	top: 38%;
	background-color: white;
	position: absolute;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;

const InfoNavBar = styled(ContainerPrototype)`
	height: 10%;
	padding: 0 1rem;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;

const InfoNavBody = styled(ContainerPrototype)`
	height: 90%;
	padding: 1rem;
`;

export default function PokemonProfileInfo(): JSX.Element {
	const [navElementsNames, setNavElementsNames] =
		useState<PokemonProfilesNavElementsInt>({
			About: { isFocused: true, element: <About /> },
			"Base Stats": {
				isFocused: false,
				element: <BaseStats />,
			},
			Evolution: { isFocused: false, element: <Evolution /> },
			Moves: { isFocused: false, element: <Moves /> },
		});

	const mapObjectToComponent = (): JSX.Element[] =>
		Object.keys(navElementsNames).map(
			(key: string): JSX.Element => (
				<NavElement
					value={key}
					navElementsNames={navElementsNames}
					setNavElementsNames={setNavElementsNames}
				/>
			),
		);

	const displayNavBody = (): React.ReactNode => {
		const focusedElement: string | undefined = Object.keys(
			navElementsNames,
		).find(
			(key: string) =>
				navElementsNames[key as keyof PokemonProfilesNavElementsInt].isFocused,
		);

		return navElementsNames[
			focusedElement as keyof PokemonProfilesNavElementsInt
		].element;

		/* let finder = ():()=> JSX.Element => {
			for (let key in navElementsNames) {
				let x = key as keyof PokemonProfilesNavElementsInt; //this was necessary because accessing properties from key var caused a type error
				if (navElementsNames[x].isFocused === true) {
					return navElementsNames[x].element;
				}
			}
		};
		console.log("stats array ", finder());
		return finder(); */
	};

	return (
		<Container>
			<InfoNavBar>{mapObjectToComponent()}</InfoNavBar>
			<InfoNavBody>{displayNavBody()}</InfoNavBody>
		</Container>
	);
}
/*  */
