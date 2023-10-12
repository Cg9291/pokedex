import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import { StatsInterface } from "../../interfaces&types/interfaces.tsx";
import { useContext } from "react";
import StatsContext from "../../contexts/statscontext.tsx";
import capitalizeWords from "../../functions/utilities/capitalizeWords.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
`;

const Stat = styled.div`
	width: 100%;
	height: 10%;
	display: flex;
	justify-content: stretch;
`;
const StatName = styled(ContainerPrototype)`
	min-width: 45%;
`;
const StatValue = styled(ContainerPrototype)`
	min-width: 1%;
`;
const StatBar = styled(ContainerPrototype)`
	min-width: 45%;
	height: 20%;
	background-color: grey;
	border-radius: 99px;
	margin-top: 0.5rem;
`;
const StatBarOverlay = styled(ContainerPrototype)<{ value: number }>`
	width: calc((${props => props.value} / 255) * 100%);
	height: 100%;
	background-color: red;
	border-radius: 99px;
`;

export default function BaseStats(): JSX.Element {
	const myStatsContext = useContext(StatsContext);
	const mapStats = (): JSX.Element[] =>
		myStatsContext.map((x: StatsInterface) => (
			<Stat>
				<StatName>{capitalizeWords(x.stat.name)}</StatName>
				<StatValue>{x["base_stat"]}</StatValue>
				<StatBar>
					<StatBarOverlay value={x["base_stat"]}></StatBarOverlay>
				</StatBar>
			</Stat>
		));
	return <Container>{mapStats()}</Container>;
}
