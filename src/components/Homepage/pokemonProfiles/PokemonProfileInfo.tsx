import { useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import NavElement from "./NavElement";
import { PokemonProfilesNavElementsInt } from "../../interfaces";

const Container = styled(ContainerPrototype)`
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

export default function PokemonProfileInfo(): JSX.Element {
	const [navElementsNames, setNavElementsNames] =
		useState<PokemonProfilesNavElementsInt>({
			About: { isFocused: true },
			"Base Stats": { isFocused: false },
			Evolution: { isFocused: false },
			Moves: { isFocused: false },
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

	return (
		<Container>
			<InfoNavBar>{mapObjectToComponent()}</InfoNavBar>
		</Container>
	);
}
