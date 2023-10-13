import { useContext } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import VitalsContext from "../../../contexts/vitalscontext.tsx";
import { Flavor_text_entry } from "../../../interfaces&types/pokemonSpeciesInterface.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	//padding: 0 0 0 2rem;
`;

const Description = styled.p`
	padding: 0 2rem;
	font-size: 0.8em;
`;

const VitalsSectionContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: start;
	justify-content: space-between;
	height: 100%;
	//background-color: red;
	margin-top: 1rem;
	align-content: start;
	font-size: 0.8em;
	//padding:0 0 0 1rem;
`;

const VitalsContainer = styled(ContainerPrototype)`
	display: flex;
	flex-direction: column;
	justify-content: start;
	margin: 0 0 2rem;
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

export default function About(): JSX.Element {
	const { flavor_text_entries } = useContext(VitalsContext);
	let { height, weight, color, abilities } = useContext(VitalsContext);

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

	console.log("and", updatedVitalsArray);

	const displayVitals = (): JSX.Element[] =>
		updatedVitalsArray.map(
			(entry: [string, string]): JSX.Element => (
				<Vitals
					label={entry[0]}
					value={entry[1]}
				/>
			),
		);

	const displayEnglishDescription = (): string => {
		const englishDescription = (): Flavor_text_entry =>
			flavor_text_entries.find(
				(i: Flavor_text_entry): boolean => i.language.name === "en",
			)!; //review why is it boolean and not Flavor_text_entry

		return englishDescription().flavor_text;
	};

	return (
		flavor_text_entries && (
			<Container>
				<Description>{displayEnglishDescription()}</Description>
				<VitalsSectionContainer>{displayVitals()}</VitalsSectionContainer>
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
