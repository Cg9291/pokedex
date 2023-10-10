import { useContext } from "react";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import VitalsContext from "../../contexts/vitalscontext.tsx";
import { Flavor_text_entry } from "../../interfaces&types/pokemonSpeciesInterface.tsx";

const Container = styled(ContainerPrototype)``;

const Description = styled.p``;

export default function About(): JSX.Element {
	const myVitalsContext = useContext(VitalsContext);
	return (
		<Container>
			<Description>
				{/* {myVitalsContext["flavor_text" as keyof Flavor_text_entry]} */}
			</Description>
		</Container>
	);
}
