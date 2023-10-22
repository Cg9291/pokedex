import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype.tsx";
import Header from "../components/homepage/header/Header.tsx";
import PokemonPictureCard from "../components/homepage/body/pokemonPictureCards/PokemonPictureCard.tsx";
import { useContext } from "react";
import RandomPokemonSelectionContext from "../contexts/randomPokemonSelectionContext.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
`;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	height: 400px;
	padding: 1vh 1vw;
	margin-top: 13rem;
	overflow-y: scroll;
`;

export default function Homepage(): JSX.Element {
	const localRandomPokemonSelection = useContext(RandomPokemonSelectionContext);
	const { randomPokemonSelection } = localRandomPokemonSelection;

	const mapPictureCards = (): JSX.Element[] =>
		randomPokemonSelection.map((generatedNumber: number) => (
			<PokemonPictureCard id={generatedNumber} />
		));

	return (
		<Container>
			<Header />
			<MainContainer>{mapPictureCards()}</MainContainer>
		</Container>
	);
}
