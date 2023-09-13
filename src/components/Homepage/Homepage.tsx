import styled from "styled-components";
import ContainerPrototype from "../Prototypes/ContainerPrototype.tsx";
import Header from "./Header/Header.tsx";
import PokemonPictureCard from "./PokemonPictureCard.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
`;

export default function Homepage(): JSX.Element {
	return (
		<Container>
			<Header />
			<Row>
				<PokemonPictureCard pokemonNumber={1} />
				<PokemonPictureCard pokemonNumber={4} />
			</Row>
			<Row>
				<PokemonPictureCard pokemonNumber={7} />
				<PokemonPictureCard pokemonNumber={15} />
			</Row>
			<Row>
				<PokemonPictureCard pokemonNumber={25} />
				<PokemonPictureCard pokemonNumber={26} />
			</Row>
		</Container>
	);
}
