import styled from "styled-components/macro";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";
import React from "react";
import { SvgIcon } from "../../SvgIcons";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { typesColors } from "../../../objects/typesColors";
import * as breakpoints from "../../../objects/breakpoints";
import ContainerPrototype from "../../prototypes/ContainerPrototype";

export function PokemonTypesElement(props: PokemonTypesPropsInterface): React.ReactElement {
    return props.typeName !== "none" ? (
        <Container
            $dynamicBackground={props.dynamicBackground ? true : false}
            $pokeType={props.typeName.toLowerCase()}
            $whereUsed={props.whereUsed}
        >
            <SvgIcon pokeType={props.typeName.toLowerCase()} whereUsed={props.whereUsed} />
            <PokemonTypeText>{capitalizeWords(props.typeName)}</PokemonTypeText>
        </Container>
    ) : (
        <Container $pokeType="none" $whereUsed={props.whereUsed}>
            <PokemonTypeText> {capitalizeWords(props.typeName)}</PokemonTypeText>
        </Container>
    );
}
const Container = styled(ContainerPrototype)<{ $dynamicBackground?: boolean; $pokeType: string; $whereUsed?: string }>`
    flex:1 0 0;
    padding: ${(props) => (props.$whereUsed === "favorites" || props.$whereUsed === "homepage" ? "5% " : "2%")};
    border-radius: 99px;
    background-color: ${(props) =>
        props.$dynamicBackground ? typesColors[props.$pokeType as keyof TypesColorsInt] : "rgba(0, 0, 0, 0.2)"};
    color: white;
    text-align: center;
    align-items: center;
    font-size: 0.6rem;
    font-weight: 600;
    justify-content: ${(props) => (props.$pokeType === "none" ? "center" : "space-between")};
    overflow:hidden;
    max-height:${(props) => (props.$whereUsed === "favorites" || props.$whereUsed === "homepage" ? "50% " : "100%")};

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        font-size: 0.8rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        flex: 0 0 3rem;
        font-size: 1.25rem;
        padding-right: 0.8rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        height: 3rem;
        font-size: 1.25rem;
        padding-right: 1rem;
    }

    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.mobileS} {
        padding: 0.4rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} and ${
        breakpoints.widthsQueries.maxWidths.mobileM
    } {
        font-size: 0.66rem;
    }

    /
`;

const PokemonTypeText = styled.p`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex: 1 0 0;
    align-items: center;
`;
