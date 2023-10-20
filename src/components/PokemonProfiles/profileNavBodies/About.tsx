import { useContext } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import VitalsContext from "../../../contexts/vitalsContext.tsx";
import { Flavor_text_entry } from "../../../interfaces&types/pokemonSpeciesInterface.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";
import { typesSW } from "../../../objects/typesSW.tsx";
import TypesSWInterface from "../../../interfaces&types/pokemonTypesSWInterface.tsx";
import typesColors from "../../../objects/typesColors.tsx";
import { TypesColorsInt } from "../../../interfaces&types/misc_Interfaces.tsx";
import TypePrototype from "../../prototypes/TypePrototype.tsx";

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

export default function About(): JSX.Element {
	const { flavor_text_entries } = useContext(VitalsContext);
	let { height, weight, color, types, abilities } = useContext(VitalsContext);

	types = types ? types[0].type.name : undefined;
	height = height / 10 + "m";
	weight = weight + "kg";
	color = color ? color.name : undefined;
	abilities = abilities ? abilities[0].ability.name : undefined;

	const updatedVitalsArray = Object.entries({
		height,
		weight,
		color,
		abilities,
	});

	const displayEnglishDescription = (): string => {
		const englishDescription = (): Flavor_text_entry =>
			flavor_text_entries.find(
				(i: Flavor_text_entry): boolean => i.language.name === "en",
			);

		return englishDescription().flavor_text;
	};

	const displayVitals = (): JSX.Element[] =>
		updatedVitalsArray.map(
			(entry: [string, string]): JSX.Element => (
				<Vitals
					label={entry[0]}
					value={entry[1]}
				/>
			),
		);

	return (
		flavor_text_entries && (
			<Container>
				<Description>{displayEnglishDescription()}</Description>
				<VitalsSectionContainer>{displayVitals()}</VitalsSectionContainer>
				<SWSectionContainer>
					<StrengthsAndWeaknesses type={types} />
				</SWSectionContainer>
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

function StrengthsAndWeaknesses(props: { type: string }) {
	const displayStrengths = (): JSX.Element[] =>
		typesSW[props.type as keyof TypesSWInterface].strengths.map(x => {
			const lowerCaseX = x.toLowerCase();
			return (
				<StrengthsAndWeaknessesElement
					sValue={x}
					sColor={typesColors[lowerCaseX as keyof TypesColorsInt]}
				/>
			);
		});

	const displayWeaknesses = (): JSX.Element[] =>
		typesSW[props.type as keyof TypesSWInterface].weaknesses.map(x => {
			const lowerCaseX = x.toLowerCase();
			return (
				<StrengthsAndWeaknessesElement
					sValue={x}
					sColor={typesColors[lowerCaseX as keyof TypesColorsInt]}
				/>
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

function StrengthsAndWeaknessesElement(props: {
	sValue: string;
	sColor: string;
}): JSX.Element {
	return (
		<SWElement
			$bgColor={props.sColor}
			$value={props.sValue}
		>
			{props.sValue}
		</SWElement>
	);
}
