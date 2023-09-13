import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../Prototypes/ContainerPrototype";

import getPokemonData from "../../api_calls/getPokemonData";

const Container = styled.div`
	width: 45%;
	height: 20vh;
	padding: 0.5rem;
	border-radius: 25px;
	background-color: darkblue;
`;

const Wrapper = styled(ContainerPrototype)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(5, 1fr);
	grid-template-areas:
		"name name name"
		". . ."
		". . image"
		"types1 . image"
		"types2 . image";
	border-radius: 25px;
	//background-color: yellow;
`;
const PokemonImg = styled.img`
	grid-area: image;
`;

interface pokemonCardsProps {
	pokemonNumber: number;
}

export default function PokemonPictureCard(
	props: pokemonCardsProps,
): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<{}>({});
	const [imgUrl, setImgUrl] = useState<string>("");
	//getPokemonData(props.pokemonNumber, setPokemonInfo);
	useEffect(() => {
		getPokemonData(props.pokemonNumber, setPokemonInfo);
	}, []);

	useEffect(()=>{
		setImgUrl(pokemonInfo.sprites.default_front)
	},[pokemonInfo]);


console.log(imgUrl)
	return (
		<Container>
			<Wrapper>
				<PokemonImg
					src={imgUrl}
					alt="a pokemon image"
				/>
			</Wrapper>
		</Container>
	);
}
