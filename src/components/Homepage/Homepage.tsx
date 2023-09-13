import styled from "styled-components";
import ContainerPrototype from "../Prototypes/ContainerPrototype.tsx";
import Header from "./Header/Header.tsx";
import PokemonPictureCard from "./PokemonPictureCard.tsx";
import { useState } from "react";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
`;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
	padding: 0 1%;
`;

export default function Homepage(): JSX.Element {
	const [pokemonLookupNumber, setPokemonLookupNumber] = useState<number[]>([
		1, 4, 7, 15, 25, 26,
	]);
	const mapPictureCards = (): JSX.Element[] =>
		pokemonLookupNumber.map(i => <PokemonPictureCard pokemonNumber={i} />);

	return (
		<Container>
			<Header />
			<MainContainer>{mapPictureCards()}</MainContainer>
		</Container>
	);
}
