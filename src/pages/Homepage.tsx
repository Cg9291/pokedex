import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype.tsx";
import Header from "../components/Homepage/header/Header.tsx";
import PokemonPictureCard from "../components/Homepage/body/pokemonPictureCards/PokemonPictureCard.tsx";

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
	margin-top:13rem;
	overflow-y:scroll;
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
		//console.log(numberArray)
		return numberArray;
	};

	const mapPictureCards = (): JSX.Element[] =>
		pokemonLookupNumber().map(i => <PokemonPictureCard id={i} />);

	return (
		<Container>
			<Header />
			<MainContainer>{mapPictureCards()}</MainContainer>
		</Container>
	);
}
