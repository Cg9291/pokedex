import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import LinkPrototype from "../prototypes/LinkPrototype.tsx";
import styled from "styled-components";

const Container = styled(ContainerPrototype)`
	background-color: green;
`;

const Stat = styled.div`
	width: 100%;
	height: 10%;
	display: flex;
`;
const StatName = styled(ContainerPrototype)``;
const StatValue = styled(ContainerPrototype)``;
const StatBar = styled(ContainerPrototype)``;
const StatBarOverlay = styled(ContainerPrototype)``;

const stats = ["HP", "Attack", "Defense", "Sp.Atk", "Sp.Def", "Speed", "Total"];

export default function BaseStats(): JSX.Element {
	return (
		<Container>
			<Stat>
				<StatName>testname</StatName>
				<StatValue>testvalue</StatValue>
				<StatBar>
					<StatBarOverlay></StatBarOverlay>
				</StatBar>
			</Stat>
		</Container>
	);
}
