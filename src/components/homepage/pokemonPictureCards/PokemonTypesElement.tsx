import styled from "styled-components/macro";
import { PokemonTypesPropsInterface } from "../../../interfaces/miscInterfaces";
import React from "react";
import { SvgIcon } from "../../SvgIcons";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { typesColors } from "../../../objects/typesColors";
import * as breakpoints from "../../../objects/breakpoints";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { whereUsedValues } from "../../../objects/whereUsedValues";

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
    flex: 1 0 0;
    padding: ${(props) =>
        props.$whereUsed === whereUsedValues.aboutSection.maintype
            ? "1%"
            : props.$whereUsed === whereUsedValues.homepage
            ? "3%"
            : "5%"};
    border-radius: 99px;
    background-color: ${(props) =>
        props.$dynamicBackground ? typesColors[props.$pokeType as keyof TypesColorsInt] : "rgba(0, 0, 0, 0.2)"};
    color: white;
    text-align: center;
    align-items: center;
    font-size: ${(props) =>
        props.$whereUsed === whereUsedValues.aboutSection.maintype
            ? "6vw"
            : props.$whereUsed === whereUsedValues.aboutSection.strengthsAndWeaknesses
            ? "3.8vw"
            : "3vw"};
    line-height: 3vw;
    font-weight: 600;
    justify-content: ${(props) => (props.$pokeType === "none" ? "center" : "space-between")};
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        //font-size: 0.8rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.25rem;
        //padding-right: 0.8rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
    }

    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.mobileS} {
        //padding: 0.4rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} and ${breakpoints.widthsQueries.maxWidths
            .mobileM} {
        //font-size: 0.66rem;
    }

    @media (orientation: landscape) {
        //padding: 5%;
        //font-size: inherit;
    }
`;

const PokemonTypeText = styled.p`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex: 1 0 0;
    align-items: center;
`;
