import React, { useState, useEffect } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components/macro";
import { Mfe } from "../../../interfaces/pokemonInterface";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { getPokemonMovesTypesData } from "../../../functions/api/singleApiCalls/getPokemonMovesTypesData";
import { PokemonMovesInterface } from "../../../interfaces/pokemonMovesInterface";
import { typesColors } from "../../../objects/typesColors";
import { MovesComponentProps, TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { LoadingSpinnerPrototype } from "../../prototypes/LoadingSpinnerPrototype";
import { SvgIcon } from "../../SvgIcons";

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
                <MoveTypeContainer>
                    {" "}
                    <SvgIcon pokeType={type.name.toLowerCase()} />
                </MoveTypeContainer>
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
`;

const MoveContainer = styled(ContainerPrototype)`
    justify-content: space-between;
    border-bottom: 0.1rem solid grey;
    padding: 3%;
    flex: 0 0 20%;
    overflow: hidden;
    @media (orientation: landscape) {
        padding: 1%;
        flex: 0 0 15vh;
    }
`;

const MoveNameContainer = styled(ContainerPrototype)`
    align-items: center;
    flex: 0 0 content;
`;

const MoveTypeContainer = styled(ContainerPrototype)<{ $typeName?: string }>`
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: ${(props) => typesColors[props.$typeName as keyof TypesColorsInt]};
    flex: 0 0 10%;
    justify-content: flex-end;
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    flex: 0 0 content;
    width: unset;
    height: 100%;
    border-width: 0.25rem;
    border-bottom-color: yellow;
    //justify-self: flex-end;
`;
