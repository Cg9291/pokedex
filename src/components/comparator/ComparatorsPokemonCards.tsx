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
                <ButtonContainer>
                    <ChangeSelectionButton
                        onClick={() => props.setIsModalActive({ isActive: true, activeImageNumber: props.imgOrder })}
                    >
                        Switch
                    </ChangeSelectionButton>
                </ButtonContainer>
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
    width: "100",
    height: "100"
})``;

const ButtonContainer = styled(ContainerPrototype)`
    flex: 0 0 50%;
    justify-content: center;
    align-items: center;
`;

const ChangeSelectionButton = styled.button.attrs({ type: "button" })`
    padding: 0 1rem;
    border: 1px solid black;
    border-radius: 7px;
    font-weight: 600;
    flex: 0 1 75%;
    aspect-ratio: 2.5/1;
    color: inherit;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        height: 3.2rem;
        font-size: 1.3rem;
        left: 0.5rem;
    }
`;
