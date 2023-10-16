import { useContext } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import MovesContext from "../../../contexts/movesContext.tsx";
import { Mfe } from "../../../interfaces&types/pokemonInterface.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";
import getPokemonMovesTypesData from "../../../functions/api_calls/getPokemonMovesTypesData.tsx";
import {
	PokemonMovesInterface,
	Type,
} from "../../../interfaces&types/pokemonMovesInterface.tsx";
import { ObjectPlaceHolderInterface } from "../../../interfaces&types/misc_Interfaces.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	overflow-y: scroll;
`;

const MoveContainer = styled.div`
	border-bottom: 0.1rem solid grey;
	padding: 0.8rem 0;
`;

export default function Moves(): JSX.Element {
	const myMovesContext = useContext(MovesContext);
	const getData = async (
		move: string,
	): Promise<PokemonMovesInterface | ObjectPlaceHolderInterface> => {
		let moveType: PokemonMovesInterface | ObjectPlaceHolderInterface = {};
		try {
			moveType = await getPokemonMovesTypesData(move);
		} catch (err) {
			console.log(err);
		}
		console.log(moveType);
		return moveType;
	};

	const displayMoves = () => {
		return myMovesContext.map((x: Mfe) => {
			return (
				<Move
					moveName={x.move.name}
					moveType={getData(x.move.url)}
				/>
			);
		});
	};

	return <Container>{displayMoves()}</Container>;
}

function Move(props: {
	moveName: string;
	moveType: Promise<PokemonMovesInterface | ObjectPlaceHolderInterface>;
}): JSX.Element {
	return (
		<MoveContainer>
			{capitalizeWords(props.moveName)}
			{/* {props.moveType} */}
		</MoveContainer>
	);
}
