import styled from "styled-components/macro";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";
import React from "react";
import { SvgIcon } from "../../SvgIcons";

export function PokemonTypesElement(props: PokemonTypesPropsInterface): React.ReactElement {
    console.log(props.typeName);
    return (
        <Container>
            <SvgIcon pokeType={props.typeName} />
            {props.typeName}
        </Container>
    );
}
const Container = styled.div`
    width: max-content;
    height: max-content;
    margin-bottom: 0.4rem;
    padding: 0.3rem 0.5rem;
    border-radius: 99px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
    display: flex;
`;
