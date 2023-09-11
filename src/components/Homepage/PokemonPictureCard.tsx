import styled from "styled-components";
import ContainerPrototype from "../Prototypes/ContainerPrototype";

import getPokemonData from "../../api_calls/getPokemonData";

const Container = styled.div`
	height: 25vh;
	width: 25vw;
	padding: 1px;
	border-radius: 25px;
`;

const Wrapper = styled(ContainerPrototype)``;

export default function PokemonPictureCard(): JSX.Element {
	let img = console.log(getPokemonData(2));
	return (
		<Container>
			<Wrapper>
				<img
					href={getPokemonData(2)}
					alt="a pokemon image"
				></img>
				{img}
			</Wrapper>
		</Container>
	);
}
