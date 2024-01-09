import React from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components/macro";
import { Flavor_text_entry } from "../../../interfaces/pokemonSpeciesInterface";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { typesSW } from "../../../objects/typesSW";
import { TypesSWInterface, TypeSWInterface } from "../../../interfaces/pokemonTypesSWInterface";

import { AboutComponentProps } from "../../../interfaces/miscInterfaces";

import { PokemonTypesElement } from "../../homepage/pokemonPictureCards/PokemonTypesElement";

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
                    <PokemonTypesElement typeName={types[0].type.name} dynamicBackground={true} />
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
    const displayStrengths = (strengthsOrWeaknesses: string): React.ReactElement[] =>
        typesSW[props.type as keyof TypesSWInterface][strengthsOrWeaknesses as keyof TypeSWInterface].map(
            (x: string) => {
                return <PokemonTypesElement typeName={x} dynamicBackground={true} key={x} />;
            }
        );

    return (
        <SWContainer>
            <h3>Strengths</h3>
            <SWElementsContainer>{displayStrengths("strengths")}</SWElementsContainer>
            <h3>Weaknesses</h3>
            <SWElementsContainer>{displayStrengths("weaknesses")}</SWElementsContainer>
        </SWContainer>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem 1rem;
    height: min-content;
`;

const Description = styled.p`
    padding: 0 0;
    font-size: 0.8em;
    font-style: italic;
    font-weight: bold;
`;

const TypeContainer = styled.div`
    display: flex;
    justify-content: start;
    margin-top: 0.5rem;
`;

const VitalsSectionContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    /* flex-wrap: wrap;
    align-items: start; */
    min-height: max-content;
    margin: 0 0 0 0.5rem;
    padding: 1rem 0 0 0;
    //align-content: space-between;
    font-size: 0.8em;
    justify-content: space-between;
    column-gap: 1rem;
`;

const VitalsContainer = styled(ContainerPrototype)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-height: 10%;
    height: max-content;
    flex: 0 0 20%;
`;

const VitalsLabel = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;
    margin-bottom: 0.5rem;
`;

const VitalsValue = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;
    font-weight: bold;
    height: fit-content;
    //max-height: 2rem;
`;

const SWSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 1rem;
`;

const SWContainer = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        margin-left: 0.2rem;
    }
`;

const SWElementsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 0.5rem 0 0 0;
    margin: 0 0 1rem 0;
`;
