import React from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { pickRandomPokemonNumbers } from "../../../functions/utilities/pickRandomPokemonNumbers";
import comparatorsButtonLogo from "../../../assets/comparatorsRandomizeButtonLogo.png";
import { RandomPokemonSelectionInterface } from "../../../interfaces/miscInterfaces";
import * as breakpoints from "../../../objects/breakpoints";

export function RandomizeSelectionButton(props: RandomPokemonSelectionInterface): React.ReactElement {
    const { setRandomPokemonSelection } = props;

    const randomize = () => {
        setRandomPokemonSelection(pickRandomPokemonNumbers());
    };

    return (
        <Container>
            <Button onClick={() => randomize()}>{/* <RandomizeButtonImage /> */}</Button>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    aspect-ratio: 1/1;
    //z-index: 1;
    grid-area: randomizeButton;
    align-self: start;
    align-items: flex-start;

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        top: 1.5rem;
        right: 2rem;
    }
`;

const Button = styled.button.attrs({ type: "button" })`
    width: 100%;
    flex: 1 0 0;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: white;
    border: none;
    &:hover {
        cursor: pointer;
    }

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("360px")} {
            //max-height: 1rem;
            //min-width: 1rem;
        }
    }
    @media ${breakpoints.widthsQueries.minWidths.flexible("1212px")} {
        min-width: 4rem;
        min-height: 4rem;
    }
`;

export const RandomizeButtonImage = styled.img.attrs({
    src: comparatorsButtonLogo
})`
    width: 100%;
    height: 100%;
`;
