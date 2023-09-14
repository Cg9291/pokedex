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
	display: flex;
	flex-direction: column;

	/* 	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(5, 1fr);
	grid-template-areas:
		"name name name"
		". . ."
		". . image"
		"types1 . image"
		"types2 . image";
	border-radius: 25px; */
	//background-color: yellow;
`;

const PokeName = styled.h3`
	height: 20%;
	grid-area: name;
`;

const Wrapper2 = styled(ContainerPrototype)`
	width: 100%;
`;

const PokemonTypesContainer = styled(ContainerPrototype)`
	width: 50%;
`;

const PokemonImgWrapper = styled.div`
	width: 50%;
`;
const PokemonImg = styled.img`
	width: 200%;
	aspect-ratio: 1/1;
`;

interface pokemonCardsProps {
	pokemonNumber: number;
}

export default function PokemonPictureCard(
	props: pokemonCardsProps,
): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<{ [key: string]: any }>({});

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
				<Wrapper2>
					<PokemonTypesContainer />
					<PokemonImgWrapper>
						{sprites && (
							<PokemonImg
								src={sprites.front_default}
								alt="a pokemon image"
							/>
						)}
						
					</PokemonImgWrapper>
				</Wrapper2>
			</Wrapper>
		</Container>
	);
}
