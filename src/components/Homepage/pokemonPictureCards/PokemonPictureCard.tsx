import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../../Prototypes/ContainerPrototype";
import PokemonTypesElement from "./PokemonTypesElement";

import getPokemonData from "../../../functions/api_calls/getPokemonData";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";

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
	//background-color: yellow;
	border-radius: 25px;
`;

const PokeName = styled.h3`
	height: 20%;
	color: white;
`;

const SubContainer = styled(ContainerPrototype)`
	width: 100%;
`;

const PokemonTypesContainer = styled(ContainerPrototype)`
	width: 50%;
	flex-direction: column;
	justify-content: end;
`;

const PokemonImgWrapper = styled.div`
	width: 50%;
`;

const SvgImg = styled.svg`
	width: 100%;
	height: 100%;
`;
const PokemonImg = styled.image`
	width: 200;
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

	const renderPokemonTypes = (): JSX.Element =>
		types.map(x => <PokemonTypesElement typeName={x.type.name} />);

	return (
		<Container>
			<Wrapper>
				<PokeName>{name && capitalizeWords(name)}</PokeName>
				<SubContainer>
					<PokemonTypesContainer>
						{types && renderPokemonTypes()}
					</PokemonTypesContainer>
					<PokemonImgWrapper>
						{sprites && (
							<SvgImg viewBox="50 50 200 200">
								<PokemonImg
									href={sprites.front_default}
									alt="a pokemon image"
									width="325"
									height="325"
								/>
							</SvgImg>
						)}
					</PokemonImgWrapper>
				</SubContainer>
			</Wrapper>
		</Container>
	);
}
