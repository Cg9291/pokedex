import styled from "styled-components/macro";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { typesColors } from "../../objects/typesColors";
import { TypesColorsInt } from "../../interfaces/miscInterfaces";
import { ComparatorPokemonCardsPropsInterface } from "../../interfaces/comparatorInterfaces";
import { capitalizeWords } from "../../functions/utilities/capitalizeWords";
import * as breakpoints from "../../objects/breakpoints";

export function ComparatorsPokemonCards(props: ComparatorPokemonCardsPropsInterface): React.ReactElement {
    const { name, sprites, types } = props.pokemonData;
    return (
        <ComparatorPokemonCardsContainer
            $isCompared={props.isCompared && props.isCompared}
            $mainType={types ? types[0].type.name : null}
        >
            {!props.isCompared && (
                <ChangeSelectionButton
                    onClick={() => props.setIsModalActive({ isActive: true, activeImageNumber: props.imgOrder })}
                >
                    Switch
                </ChangeSelectionButton>
            )}
            <PokemonImg src={sprites.front_default} />
            {props.isCompared && <PokemonName>{capitalizeWords(name)}</PokemonName>}
        </ComparatorPokemonCardsContainer>
    );
}

const ComparatorPokemonCardsContainer = styled(ContainerPrototype)<{ $isCompared?: boolean; $mainType: string | null }>`
    min-height: 40%;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
    width: ${({ $isCompared }) => $isCompared && ` 40%`};
    height: ${({ $isCompared }) => ($isCompared ? ` fit-content;` : `30%`)};
    background-color: ${(props) =>
        props.$mainType ? typesColors[props.$mainType as keyof TypesColorsInt] : `lightgrey`};

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: relative;
    }
`;

const PokemonName = styled.h5`
    background-color: white;
    border: 0.1rem solid grey;
    border-radius: 50px;
    padding: 0.5rem 0.2rem;
`;

const PokemonImg = styled.img`
    width: 9rem;
    aspect-ratio: 1/1;
`;

const ChangeSelectionButton = styled.button.attrs({ type: "button" })`
    //Will review
    position: absolute;
    width: fit-content;
    left: 0;
    height: 1.8rem;
    //aspect-ratio: 1/1;
    margin-left: 1.2rem;
    padding: 0 1rem;
    //background-color: gold;
    border: 1px solid black;
    border-radius: 7px;
    font-weight: 600;
`;
