import styled from "styled-components/macro";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";
import React from "react";
import { SvgIcon } from "../../SvgIcons";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { typesColors } from "../../../objects/typesColors";

export function PokemonTypesElement(props: PokemonTypesPropsInterface): React.ReactElement {
    return props.typeName !== "none" ? (
        <Container $dynamicBackground={props.dynamicBackground ? true : false} $pokeType={props.typeName.toLowerCase()}>
            <SvgIcon pokeType={props.typeName.toLowerCase()} />
            {capitalizeWords(props.typeName)}
        </Container>
    ) : (
        <Container $pokeType="none">{capitalizeWords(props.typeName)}</Container>
    );
}
const Container = styled.div<{ $dynamicBackground?: boolean; $pokeType: string }>`
    min-width: max-content;
    height: 1.8rem;
    max-height: 100%;
    margin-bottom: 0.3rem;
    padding: 0.3rem 0.4rem;
    border-radius: 99px;
    background-color: ${(props) =>
        props.$dynamicBackground ? typesColors[props.$pokeType as keyof TypesColorsInt] : "rgba(0, 0, 0, 0.2)"};
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    justify-content: ${(props) => (props.$dynamicBackground ? "space-between" : "center")};
`;
