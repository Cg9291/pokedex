import React, { useContext } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import VitalsContext from "../../../contexts/vitalscontext";
import { Flavor_text_entry } from "../../../interfaces/pokemonSpeciesInterface";

const Container = styled(ContainerPrototype)``;

const Description = styled.p``;

const VitalsContainer = styled(ContainerPrototype)`
    height: 50%;
`;

const VitalsLabel = styled.div``;

const VitalsValue = styled.div``;

export default function About(): React.ReactElement {
    const { flavor_text_entries } = useContext(VitalsContext);
    const myVitalsContext = Object.entries(useContext(VitalsContext));

    /* const displayVitals = (): React.ReactElement =>
		myVitalsContext.map((x: any): React.ReactElement[] => (
			<Vitals
				label={x[0]}
				value={x[1]}
			/>
		)); */
    const displayEnglishDescription = (): string => {
        const englishDescription = (): Flavor_text_entry =>
            flavor_text_entries.find((i: Flavor_text_entry): boolean => i.language.name === "en")!; //review why is it boolean and not Flavor_text_entry

        return englishDescription().flavor_text;
    };

    return (
        flavor_text_entries && (
            <Container>
                <Description>{displayEnglishDescription()}</Description>
                {/* 	{displayVitals()} */}
            </Container>
        )
    );
}

/* function Vitals(props: { label: string; value: any }): React.ReactElement {
	return (
		<VitalsContainer>
			<VitalsLabel>{props.label}</VitalsLabel>
			<VitalsValue>{props.value}</VitalsValue>
		</VitalsContainer>
	);
}
 */
