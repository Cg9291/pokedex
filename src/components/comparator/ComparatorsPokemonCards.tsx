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
        <Container $isCompared={props.isCompared && props.isCompared} $mainType={types ? types[0].type.name : null}>
            {!props.isCompared && (
                <ChangeSelectionButton
                    onClick={() => props.setIsModalActive({ isActive: true, activeImageNumber: props.imgOrder })}
                >
                    Switch
                </ChangeSelectionButton>
            )}
            <PokemonImgContainer viewBox="0 0 100 100">
                <PokemonImg href={sprites.front_default} />
            </PokemonImgContainer>
            {props.isCompared && <PokemonName>{capitalizeWords(name)}</PokemonName>}
        </Container>
    );
}

const Container = styled(ContainerPrototype)<{ $isCompared?: boolean; $mainType: string | null }>`
    flex: 1 0 0;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
    width: ${({ $isCompared }) => $isCompared && ` 48%`};
    overflow: hidden;

    /*   min-height: ${({ $isCompared }) => ($isCompared ? ` 100%` : `40%`)};
    max-height: ${({ $isCompared }) => ($isCompared ? ` 100%` : `40%`)}; */
    background-color: ${(props) =>
        props.$mainType ? typesColors[props.$mainType as keyof TypesColorsInt] : `lightgrey`};

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        min-height: 0;
        flex: ${({ $isCompared }) => ($isCompared ? ` 0 0 100%` : `0 0 40%`)};
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: relative;
        overflow: hidden;
        width: ${({ $isCompared }) => $isCompared && ` 49%`};
        overflow: hidden;
    }
`;

const PokemonName = styled.h5`
    background-color: white;
    border: 0.1rem solid grey;
    border-radius: 50px;
    padding: 0.5rem 0.2rem;
    margin-right: 0.3rem;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        padding: 1rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        box-sizing: border-box;
        padding: 1rem 2rem;
        flex: 0 0 auto;
    }
`;

const PokemonImgContainer = styled.svg`
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex: 1 1 0;
    max-height: 13rem; //to stop image quality from getting too bad when getting bigger

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        max-height: 35vh;
    }
`;

const PokemonImg = styled.image.attrs({
    x: "0",
    //y: "12.5%",
    width: "100",
    height: "100"
})``;

const ChangeSelectionButton = styled.button.attrs({ type: "button" })`
    width: fit-content;
    left: 0;
    height: 1.8rem;

    padding: 0 1rem;
    border: 1px solid black;
    border-radius: 7px;
    font-weight: 600;
    flex: 0 0 10%;
    margin-left: 6%;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        height: 3.2rem;
        font-size: 1.3rem;
        left: 0.5rem;
    }
`;
