import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import PokemonTypesElement from "./PokemonTypesElement";

import getPokemonData from "../../../functions/api_calls/getPokemonData";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
import { PokemonInfoInt, PokemonNumberInt } from "../../types";
import typesColors, { TypesColorsInt } from "../../../objects/typesColors";

const Container = styled(Link)<{ $mainType: string }>`
	width: 45%;
	height: 19vh;
	padding: 0.5rem;
	border-radius: 25px;
	text-decoration: none;
	background-color: ${props =>
		typesColors[
			props.$mainType as keyof TypesColorsInt
		]}; //review this answer for better concept understanding
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

export default function PokemonPictureCard(
	props: PokemonNumberInt,
): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<
		PokemonInfoInt | { [key: string]: any }
	>({});

	async function getData(pokeNumber: number): Promise<PokemonInfoInt | {}> {
		const data: PokemonInfoInt = await getPokemonData(pokeNumber);
		setPokemonInfo(data);
		console.log("function getData:success", data);
		return pokemonInfo;
	}

	/* useLayoutEffect(() => {
		getPokemonData(props.pokemonNumber, setPokemonInfo);
	}, []); */

	useEffect(() => {
		getData(props.id);
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

	const renderPokemonTypes = (): JSX.Element[] =>
		types
			.toReversed()
			.map(
				(x: /*replace this with an  interface-> */ {
					slot: number;
					type: { name: string; url: string };
				}) => <PokemonTypesElement typeName={capitalizeWords(x.type.name)} />,
			);

	return (
		<Container
			to={`/pokemons/${id}`}
			$mainType={types && types[0].type.name}
			/* onClick={() => alert("Clicked")} */
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
									/* 	alt="a pokemon image" */
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
