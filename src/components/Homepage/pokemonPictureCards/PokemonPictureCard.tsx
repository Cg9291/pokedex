import { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../../Prototypes/ContainerPrototype";
import PokemonTypesElement from "./PokemonTypesElement";

import getPokemonData from "../../../functions/api_calls/getPokemonData";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
import { PokemonInfo } from "../../types";
import typesColors from "../../../objects/typesColors";

const Container = styled.a<{ $mainType: "string" }>`
	width: 45%;
	height: 19vh;
	padding: 0.5rem;
	border-radius: 25px;
	background-color: ${props => typesColors[props.$mainType]};
`;

const Wrapper = styled(ContainerPrototype)`
	display: flex;
	flex-direction: column;
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

	async function getData(pokeNumber: number): void {
		const data: PokemonInfo = await getPokemonData(pokeNumber);
		//console.log("here", data);
		setPokemonInfo(data);
	}

	/* useLayoutEffect(() => {
		getPokemonData(props.pokemonNumber, setPokemonInfo);
	}, []); */

	useEffect(() => {
		getData(props.pokemonNumber);
	}, [props.pokemonNumber]); //this dependency was not necessary,but clears out a warning message so it will be kept

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
		types
			.toReversed()
			.map(x => (
				<PokemonTypesElement typeName={capitalizeWords(x.type.name)} />
			));

	return (
		<Container
			$mainType={types && types[0].type.name}
			onClick={() => alert("Clicked")}
		>
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
