import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import pickRandomPokemonNumbers from "../../../functions/utilities/pickRandomPokemonNumbers";
import { RandomPokemonSelectionInterface } from "../../../interfaces/miscInterfaces";

export default function RandomizeSelectionButton(props: RandomPokemonSelectionInterface): React.ReactElement {
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
    height: 2rem;
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1;
`;

const Button = styled.button.attrs({ type: "button" })`
    width: 100%;
    border-radius: 5%;
    padding: 0 0.5rem;
    border: none;
`;
