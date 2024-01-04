import styled from "styled-components/macro";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";
import React from "react";
import { SvgIcon } from "../../SvgIcons";

export function PokemonTypesElement(props: PokemonTypesPropsInterface): React.ReactElement {
    console.log(props.typeName.toLowerCase());
    return (
        <Container>
            <SvgIcon pokeType={props.typeName.toLowerCase()} />
            {props.typeName}
        </Container>
    );
}
const Container = styled.div`
    min-width: max-content;
    height: 1.8rem;
    margin-bottom: 0.3rem;
    padding: 0.3rem 0.4rem;
    border-radius: 99px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    justify-content: space-between;
`;
