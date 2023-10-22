import styled from "styled-components";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";

const Container = styled.div`
    width: max-content;
    height: max-content;
    margin-bottom: 0.4rem;
    padding: 0.3rem 0.5rem;
    border-radius: 99px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
`;

export default function PokemonTypesElement(props: PokemonTypesPropsInterface): JSX.Element {
    return <Container>{props.typeName}</Container>;
}