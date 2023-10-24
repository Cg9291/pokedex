import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { Flavor_text_entry } from "../../../interfaces/pokemonSpeciesInterface";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
/* import { typesSW } from "../../../objects/typesSW"; */
/* import TypesSWInterface from "../../../interfaces&types/pokemonTypesSWInterface"; */
import typesColors from "../../../objects/typesColors";
//import { TypesColorsInt } from "../../../interfaces&types/misc_Interfaces";
//import TypePrototype from "../../prototypes/TypePrototype";
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
        const englishDescription = entry.find((i: Flavor_text_entry): boolean => i.language.name === "en"); //review why is it boolean and not Flavor_text_entry
        if (!englishDescription) {
            throw new Error("No english description found");
        }

        return englishDescription.flavor_text;
    };

    const displayVitals = (): JSX.Element[] =>
        displayedValues.map((entry: [string, string]): JSX.Element => <Vitals label={entry[0]} value={entry[1]} />);

    return (
        flavor_text_entries && (
            <Container>
                <Description>{displayEnglishDescription(flavor_text_entries)}</Description>
                <VitalsSectionContainer>{displayVitals()}</VitalsSectionContainer>
                <SWSectionContainer>{/*      <StrengthsAndWeaknesses type={types} /> */}</SWSectionContainer>
            </Container>
        )
    );
}

function Vitals(props: { label: string; value: string }): JSX.Element {
    return (
        <VitalsContainer>
            <VitalsLabel>{capitalizeWords(props.label)}</VitalsLabel>
            <VitalsValue>{capitalizeWords(props.value)}</VitalsValue>
        </VitalsContainer>
    );
}

/* function StrengthsAndWeaknesses(props: { type: string }) {
    const displayStrengths = (): JSX.Element[] =>
        typesSW[props.type as keyof TypesSWInterface].strengths.map((x) => {
            const lowerCaseX = x.toLowerCase();
            return (
                <StrengthsAndWeaknessesElement sValue={x} sColor={typesColors[lowerCaseX as keyof TypesColorsInt]} />
            );
        });

    const displayWeaknesses = (): JSX.Element[] =>
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

function StrengthsAndWeaknessesElement(props: { sValue: string; sColor: string }): JSX.Element {
    return (
        <SWElement $bgColor={props.sColor} $value={props.sValue}>
            {props.sValue}
        </SWElement>
    );
} */

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 0 5rem 0;
`;

const Description = styled.p`
    padding: 0 2rem;
    font-size: 0.8em;
`;

const VitalsSectionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    //justify-content: space-between;
    height: 7rem;
    //background-color: red;
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
    //padding:0 0 2rem;
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
    //justify-content: space-evenly;
`;

//const SWElement = styled(TypePrototype)``;
