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

const PokeName = styled.h3`
	grid-area: name;
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

	useLayoutEffect(() => {
		getPokemonData(props.pokemonNumber, setPokemonInfo);
	}, []);

	const {
		abilities,
		base_experience,
		forms,
		game_indices,
		height,
		held_items,
		id,
		is_default,
		location_area_encounters,
		moves,
		name,
		order,
		past_types,
		species,
		sprites,
		stats,
		types,
		weight,
	} = pokemonInfo;

	return (
		<Container>
			<Wrapper>
				<PokeName>{name}</PokeName>
				{sprites && (
					<PokemonImg
						src={sprites.front_default}
						alt="a pokemon image"
					/>
				)}
			</Wrapper>
		</Container>
	);
}
