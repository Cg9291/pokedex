import React from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components/macro";
import { Flavor_text_entry } from "../../../interfaces/pokemonSpeciesInterface";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { typesSW } from "../../../objects/typesSW";
import { TypesSWInterface, TypeSWInterface } from "../../../interfaces/pokemonTypesSWInterface";

import { AboutComponentProps } from "../../../interfaces/miscInterfaces";

import { PokemonTypesElement } from "../../homepage/pokemonPictureCards/PokemonTypesElement";
import { whereUsedValues } from "../../../objects/whereUsedValues";
import * as breakpoints from "../../../objects/breakpoints";

export function About(props: { ownProps: AboutComponentProps }): React.ReactElement {
    const { flavor_text_entries, types, height, weight, color, abilities } = props.ownProps;

    const displayedValues = [
        ["height", `${height / 10 + "m"}`],
        ["weight", `${weight / 10 + "kg"}`],
        ["color", `${color.name}`],
        ["abilities", `${abilities[0].ability.name}`]
    ];

    const displayEnglishDescription = (entry: Flavor_text_entry[]): string => {
        const englishDescription = entry.find((i: Flavor_text_entry): boolean => i.language.name === "en");
        if (!englishDescription) {
            throw new Error("No english description found");
        }
        return englishDescription.flavor_text.replace(String.fromCharCode(12), " ");
    };

    const displayVitals = (): React.ReactElement[] =>
        displayedValues.map((x: string[]): React.ReactElement => <Vitals label={x[0]} value={x[1]} key={x[0]} />);

    return (
        flavor_text_entries && (
            <Container>
                <Description>{displayEnglishDescription(flavor_text_entries)}</Description>
                <TypeContainer>
                    <PokemonTypesElement
                        typeName={types[0].type.name}
                        dynamicBackground={true}
                        whereUsed={whereUsedValues.aboutSection.maintype}
                    />
                </TypeContainer>
                <VitalsSectionContainer>{displayVitals()}</VitalsSectionContainer>
                <SWSectionContainer>
                    {" "}
                    <StrengthsAndWeaknesses type={types[0].type.name} />
                </SWSectionContainer>
            </Container>
        )
    );
}

function Vitals(props: { label: string; value: string }): React.ReactElement {
    return (
        <VitalsContainer>
            <VitalsLabel>{capitalizeWords(props.label)}</VitalsLabel>
            <VitalsValue>
                {props.label === "type" ? (
                    <PokemonTypesElement typeName={props.value} dynamicBackground={true} />
                ) : (
                    capitalizeWords(props.value)
                )}
            </VitalsValue>
        </VitalsContainer>
    );
}

function StrengthsAndWeaknesses(props: { type: string }) {
    console.log("SW", props.type);
    const displayStrengthsAndWeaknesses = (strengthsOrWeaknesses: string): React.ReactElement[] =>
        typesSW[props.type as keyof TypesSWInterface][strengthsOrWeaknesses as keyof TypeSWInterface].map(
            (x: string) => {
                return (
                    <PokemonTypesElement
                        typeName={x}
                        dynamicBackground={true}
                        whereUsed={whereUsedValues.aboutSection.strengthsAndWeaknesses}
                        key={x}
                    />
                );
            }
        );

    function StrengthOrWeakness(props: { isStrength: boolean }) {
        return (
            <SWContainer>
                <SWHeader>{props.isStrength ? "Strengths" : "Weaknesses"}</SWHeader>
                <SWElementsContainer>
                    {displayStrengthsAndWeaknesses(`${props.isStrength ? "strengths" : "weaknesses"}`)}
                </SWElementsContainer>
            </SWContainer>
        );
    }

    return (
        <>
            <StrengthOrWeakness isStrength={true} />
            <StrengthOrWeakness isStrength={false} />
        </>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    row-gap: 1rem;
    flex: 1 0 content;

    @media (orientation: landscape) {
        //padding-bottom: 14vh;
    }
`;

const Description = styled.p`
    padding: 0;
    font-size: 4.5vw;
    font-style: italic;
    font-weight: bold;
    flex: 0 0 content;
    text-align: center;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 3vw;
    }

    @media (orientation: landscape) {
        font-size: 5vh;
        @media ${breakpoints.widthsQueries.minWidths.laptop} {
            font-size: 3vh;
        }
    }
`;

const TypeContainer = styled(ContainerPrototype)`
    flex: 0 0 6vh;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        flex: 0 0 6vh;
    }

    @media (orientation: landscape) {
        flex: 1 0 15vh;
        @media ${breakpoints.widthsQueries.minWidths.laptop} {
            flex: 1 0 10vh;
        }
    }
`;

const VitalsSectionContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 1em;
    column-gap: 1rem;
    flex: 0 0 content;
`;

const VitalsContainer = styled(ContainerPrototype)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: max-content;
    flex: 1 0 0;
    row-gap: 0.2rem;
`;

const VitalsLabel = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex: 0 0 content;
    font-weight: bold;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 2.8vw;
    }
`;

const VitalsValue = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex: 0 0 content;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 2.6vw;
    }
`;

const SWSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 content;
    row-gap: 1rem;
    h3 {
        margin-left: 0.2rem;
    }
`;

const SWHeader = styled.h3`
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 4vw;
    }

    @media (orientation: landscape) {
        @media ${breakpoints.widthsQueries.minWidths.tablet} {
            font-size: 5vh;
        }
    }
`;

const SWElementsContainer = styled(ContainerPrototype)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 6vh;
    gap: 0.5rem;
    min-height: 6vh;
    overflow-y: hidden;
    @media (orientation: landscape) {
        grid-auto-rows: 8vh;
    }
`;

const SWContainer = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 0 0 content;
    row-gap: 0.2rem;
`;
