import React, { useState, useEffect } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { Mfe } from "../../../interfaces/pokemonInterface";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { getPokemonMovesTypesData } from "../../../functions/api/singleApiCalls/getPokemonMovesTypesData";
import { PokemonMovesInterface } from "../../../interfaces/pokemonMovesInterface";
import { typesColors } from "../../../objects/typesColors";
import { MovesComponentProps, TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { LoadingSpinnerPrototype } from "../../prototypes/LoadingSpinnerPrototype";

export function Moves(props: { ownProps: MovesComponentProps }): React.ReactElement {
    const { moves } = props.ownProps;
    const displayMoves = (): React.ReactElement[] =>
        moves.map((x: Mfe) => <IntanceOfMove moveName={x.move.name} moveUrl={x.move.url} key={x.move.name} />);
    return <Container>{displayMoves()}</Container>;
}

function IntanceOfMove(props: { moveName: string; moveUrl: string }): React.ReactElement {
    const [pokemonType, setPokemonType] = useState<PokemonMovesInterface>();

    useEffect(() => {
        getData(props.moveUrl);
    }, []);

    const getData = async (moveDataUrl: string): Promise<void> => {
        try {
            const data = await getPokemonMovesTypesData(moveDataUrl);
            setPokemonType(data);
        } catch (err) {
            console.log(err);
        }
        return;
    };

    if (pokemonType) {
        const { type } = pokemonType;
        return (
            <MoveContainer>
                <MoveNameContainer>{capitalizeWords(props.moveName)}</MoveNameContainer>
                <MoveTypeContainer $typeName={type.name} />
            </MoveContainer>
        );
    } else {
        return (
            <MoveContainer>
                <LoadingAnimation />
            </MoveContainer>
        );
    }
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    height: 100%;
`;

const MoveContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1rem solid grey;
    padding: 0.8rem 0;
`;

const MoveNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

const MoveTypeContainer = styled.div<{ $typeName: string }>`
    width: 2.5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: ${(props) => typesColors[props.$typeName as keyof TypesColorsInt]};
    margin-right: 1rem;
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    max-width: 2.5rem;
    border: 0.5rem solid grey;
    border-bottom-color: yellow;
`;
