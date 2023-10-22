import { useState, useContext } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import PokemonProfileNavElement from "./PokemonProfileNavElement.tsx";
import { PokemonProfilesNavElementsInterface } from "../../interfacesAndTypes/miscInterfaces.tsx";
import BaseStats from "./profileNavBodies/BaseStats.tsx";
import About from "./profileNavBodies/About.tsx";
import Moves from "./profileNavBodies/Moves.tsx";
import Evolution from "./profileNavBodies/Evolution.tsx";

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

export default function PokemonProfileInfo(props: {
	body: JSX.Element | undefined | string;
}): JSX.Element {
	const [navElementsNames, setNavElementsNames] =
		useState<PokemonProfilesNavElementsInterface>({
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
				<PokemonProfileNavElement
					value={key}
					navElementsNames={navElementsNames}
					setNavElementsNames={setNavElementsNames}
				/>
			),
		);

	const displayNavBody = (): React.ReactNode => {
		const focusedElement: string = Object.keys(navElementsNames).find(
			(key: string) =>
				navElementsNames[key as keyof PokemonProfilesNavElementsInterface]
					.isFocused,
		)!;
		return navElementsNames[
			focusedElement as keyof PokemonProfilesNavElementsInterface
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
	console.log(props.body);
	return (
		<Container>
			<InfoNavBar>{mapObjectToComponent()}</InfoNavBar>
			<InfoNavBody>{props.body}</InfoNavBody>
		</Container>
	);
}
/*  */
