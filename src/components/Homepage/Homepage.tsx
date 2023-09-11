import styled from "styled-components";
import ContainerPrototype from "../Prototypes/ContainerPrototype.tsx";
import Header from "./Header/Header.tsx";
import PokemonPictureCard from "./PokemonPictureCard.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
`;

export default function Homepage(): JSX.Element {
	return (
		<Container>
			<Header />
			<PokemonPictureCard />
		</Container>
	);
}
