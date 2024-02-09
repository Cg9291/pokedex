import styled from "styled-components/macro";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";
import React from "react";
import { SvgIcon } from "../../SvgIcons";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { typesColors } from "../../../objects/typesColors";
import * as breakpoints from "../../../objects/breakpoints";

export function PokemonTypesElement(props: PokemonTypesPropsInterface): React.ReactElement {
    return props.typeName !== "none" ? (
        <Container
            $dynamicBackground={props.dynamicBackground ? true : false}
            $pokeType={props.typeName.toLowerCase()}
            $whereUsed={props.whereUsed}
        >
            <SvgIcon pokeType={props.typeName.toLowerCase()} whereUsed={props.whereUsed} />
            {capitalizeWords(props.typeName)}
        </Container>
    ) : (
        <Container $pokeType="none" $whereUsed={props.whereUsed}>
            {capitalizeWords(props.typeName)}
        </Container>
    );
}
const Container = styled.div<{ $dynamicBackground?: boolean; $pokeType: string; $whereUsed?: string }>`
    min-width: max-content;
    height: 1.8rem;
    max-height: 100%;
    margin-bottom: 0.3rem;
    padding: ${(props) => (props.$whereUsed === "favorites" ? "0.3rem " : "0.3rem 0.4rem")};
    border-radius: 99px;
    background-color: ${(props) =>
        props.$dynamicBackground ? typesColors[props.$pokeType as keyof TypesColorsInt] : "rgba(0, 0, 0, 0.2)"};
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    font-weight: 600;
    justify-content: ${(props) => (props.$pokeType === "none" ? "center" : "space-between")};

    @media ${breakpoints.widthsQueries.minWidths.mobileS} {
    }
    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        font-size: 0.8rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        height: 3rem;
        font-size: 1.25rem;
        padding-right: 1rem;
    }
`;
