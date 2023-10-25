import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { Flavor_text_entry } from "../../../interfaces/pokemonSpeciesInterface";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
import { typesSW } from "../../../objects/typesSW";
import TypesSWInterface from "../../../interfaces/pokemonTypesSWInterface";
import typesColors from "../../../objects/typesColors";
import { TypesColorsInt } from "../../../interfaces/miscInterfaces";
import TypePrototype from "../../prototypes/TypePrototype";
import { AboutComponentProps } from "../../../interfaces/miscInterfaces";

export default function About(props: { ownProps: AboutComponentProps }): React.ReactElement {
    const { flavor_text_entries, types, height, weight, color, abilities } = props.ownProps;

    const displayedValues = [
        ["type", `${types[0].type.name}`],
        ["height", `${height / 10 + "m"}`],
        ["weight", `${weight + "kg"}`],
        ["color", `${color.name}`],
        ["abilities", `${abilities[0].ability.name}`]
    ];

    const displayEnglishDescription = (entry: Flavor_text_entry[]): string => {
        const englishDescription = entry.find((i: Flavor_text_entry): boolean => i.language.name === "en");
        if (!englishDescription) {
            throw new Error("No english description found");
        }
        return englishDescription.flavor_text;
    };

    const displayVitals = (): React.ReactElement[] =>
        displayedValues.map((x: string[]): React.ReactElement => <Vitals label={x[0]} value={x[1]} />);

    return (
        flavor_text_entries && (
            <Container>
                <Description>{displayEnglishDescription(flavor_text_entries)}</Description>
                <VitalsSectionContainer>{displayVitals()}</VitalsSectionContainer>
                <SWSectionContainer>
                    {" "}
                    <StrengthsAndWeaknesses type={displayedValues[0][1]} />
                </SWSectionContainer>
            </Container>
        )
    );
}

function Vitals(props: { label: string; value: string }): React.ReactElement {
    return (
        <VitalsContainer>
            <VitalsLabel>{capitalizeWords(props.label)}</VitalsLabel>
            <VitalsValue>{capitalizeWords(props.value)}</VitalsValue>
        </VitalsContainer>
    );
}

function StrengthsAndWeaknesses(props: { type: string }) {
    const displayStrengths = (): React.ReactElement[] =>
        typesSW[props.type as keyof TypesSWInterface].strengths.map((x) => {
            const lowerCaseX = x.toLowerCase();
            return (
                <StrengthsAndWeaknessesElement sValue={x} sColor={typesColors[lowerCaseX as keyof TypesColorsInt]} />
            );
        });

    const displayWeaknesses = (): React.ReactElement[] =>
        typesSW[props.type as keyof TypesSWInterface].weaknesses.map((x) => {
            const lowerCaseX = x.toLowerCase();
            return (
                <StrengthsAndWeaknessesElement sValue={x} sColor={typesColors[lowerCaseX as keyof TypesColorsInt]} />
            );
        });

    return (
        <SWContainer>
            <h3>Strengths</h3>
            <SWElementsContainer>{displayStrengths()}</SWElementsContainer>
            <h3>Weaknesses</h3>
            <SWElementsContainer>{displayWeaknesses()}</SWElementsContainer>
        </SWContainer>
    );
}

function StrengthsAndWeaknessesElement(props: { sValue: string; sColor: string }): React.ReactElement {
    return (
        <SWElement $bgColor={props.sColor} $value={props.sValue}>
            {props.sValue}
        </SWElement>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem 0 1rem 0;
    height: min-content;
`;

const Description = styled.p`
    padding: 0 2rem;
    font-size: 0.8em;
`;

const VitalsSectionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    height: 7rem;
    padding: 1rem 0 0 0;
    margin: 0 0 1rem;
    align-content: flex-start;
    font-size: 0.8em;
`;

const VitalsContainer = styled(ContainerPrototype)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 0 0 3rem;
    height: 10%;
    flex: 0 0 33%;
`;

const VitalsLabel = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 0.5rem;
`;

const VitalsValue = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-weight: bold;
`;

const SWSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding-top: 1rem;
`;

const SWContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 0 2rem;
`;

const SWElementsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    padding: 0.5rem 0 0 0;
    margin: 0 0 1rem 0;
`;

const SWElement = styled(TypePrototype)``;
