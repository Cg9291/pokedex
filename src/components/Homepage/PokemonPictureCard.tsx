import { useEffect, useLayoutEffect } from "react";
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
	let img /* = getPokemonData(2); */
	/* useLayoutEffect(() => {
		getPokemonData(2).then(res => {
			img = res;
			//console.log(img)
		});
	}); */

	console.log(img);
	return (
		<Container>
			<Wrapper>
				<img
					href={img}
					alt="a pokemon image"
				></img>
				{img}
			</Wrapper>
		</Container>
	);
}
