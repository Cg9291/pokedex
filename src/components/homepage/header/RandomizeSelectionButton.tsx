import React from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { pickRandomPokemonNumbers } from "../../../functions/utilities/pickRandomPokemonNumbers";
import { RandomPokemonSelectionInterface } from "../../../interfaces/miscInterfaces";
import * as breakpoints from "../../../objects/breakpoints";

export function RandomizeSelectionButton(props: RandomPokemonSelectionInterface): React.ReactElement {
    const { setRandomPokemonSelection } = props;

    const randomize = () => {
        setRandomPokemonSelection(pickRandomPokemonNumbers());
    };

    return (
        <Container>
            <Button onClick={() => randomize()}>Randomize</Button>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    width: fit-content;
    height: 2.5rem;
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: absolute;
        //top: 2rem;
        right: 1.3rem;
    }
`;

const Button = styled.button.attrs({ type: "button" })`
    width: 100%;
    border-radius: 7px;
    padding: 0 0.5rem;
    border: none;
    font-weight: 600;
`;
