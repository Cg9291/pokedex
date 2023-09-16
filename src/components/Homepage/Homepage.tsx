import styled from "styled-components";
import ContainerPrototype from "../Prototypes/ContainerPrototype.tsx";
import Header from "./header/Header.tsx";
import PokemonPictureCard from "./pokemonPictureCards/PokemonPictureCard.tsx";

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
	padding: 1vh 1vw;
`;

export default function Homepage(): JSX.Element {
	const pokemonLookupNumber = (): number[] => {
		const numberArray: number[] = [];
		const randomNum = (): void => {
			for (let i = 0; i < 6; i++) {
				numberArray.push(Math.floor(Math.random() * (255 - 1) + 1));
			}
		};
		randomNum();
		return numberArray;
	};

	const mapPictureCards = (): JSX.Element[] =>
		pokemonLookupNumber().map(i => <PokemonPictureCard pokemonNumber={i} />);

	return (
		<Container>
			<Header />
			<MainContainer>{mapPictureCards()}</MainContainer>
		</Container>
	);
}
