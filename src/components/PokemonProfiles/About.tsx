import { useContext } from "react";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import VitalsContext from "../../contexts/vitalscontext.tsx";
import { Flavor_text_entry } from "../../interfaces&types/pokemonSpeciesInterface.tsx";

const Container = styled(ContainerPrototype)``;

const Description = styled.p``;

export default function About(): JSX.Element {
	const myVitalsContext = useContext(VitalsContext);
	const displayEnglishDescription = (): string => {
		const englishDescription = (): Flavor_text_entry =>
			myVitalsContext.find(
				(i: Flavor_text_entry): boolean => i.language.name === "en",
			)!; //review

		return englishDescription()[
			"flavor_text" as keyof typeof englishDescription
		]; //review
	};
	return (
		myVitalsContext && (
			<Container>
				<Description>{displayEnglishDescription()}</Description>
			</Container>
		)
	);
}
