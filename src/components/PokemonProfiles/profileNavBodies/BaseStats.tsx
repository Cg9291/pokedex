import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import { StatsInterface } from "../../../interfaces&types/misc_Interfaces.tsx";
import { useContext } from "react";
import StatsContext from "../../../contexts/statsContext.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	margin-top: 3rem;
`;

const StatContainer = styled.div`
	width: 100%;
	height: 2.5rem;
	display: flex;
	justify-content: stretch;
`;
const StatName = styled(ContainerPrototype)`
	min-width: 45%;
`;
const StatValue = styled(ContainerPrototype)`
	min-width: 1%;
`;
const StatBar = styled(ContainerPrototype)<{ $isTotal?: boolean }>`
	visibility: ${props => (props.$isTotal ? "hidden" : "visible")};
	min-width: 45%;
	height: 20%;
	background-color: grey;
	border-radius: 99px;
	margin-top: 0.5rem;
`;

const StatBarOverlay = styled(ContainerPrototype)<StatsOverlayPropsInt>`
	width: ${props =>
		props.$isTotal
			? `calc(${(props.$value / 1530) * 100}%)`
			: `calc(${(props.$value / 255) * 100}%)`};
	height: 100%;
	background-color: red;
	border-radius: 99px;
`;

interface StatsOverlayPropsInt {
	//formatter gets messed up when these are passed directly to component at initialization
	$value: number;
	$isTotal: boolean | undefined;
}

StatBarOverlay.defaultProps = {
	$value: 0,
	$isTotal: false,
};

export default function BaseStats(): JSX.Element {
	const myStatsContext = useContext(StatsContext);
	console.log(myStatsContext);

	const statsTotal = () => {
		let total: number = 0;
		for (let i = 0; i < myStatsContext.length; i++) {
			total = total + myStatsContext[i]["base_stat"];
		}
		return total;
	};

	const mapStats = (): JSX.Element[] =>
		myStatsContext.map((x: StatsInterface) => (
			<Stat
				name={x.stat.name}
				baseStatValue={x.base_stat}
			/>
		));
	return (
		<Container>
			{mapStats()}
			<Stat
				name="total"
				baseStatValue={statsTotal()}
				isTotal={true}
			/>
		</Container>
	);
}

function Stat(props: {
	name: string;
	baseStatValue: number;
	isTotal?: boolean | undefined;
}): JSX.Element {
	return (
		<StatContainer>
			<StatName>{capitalizeWords(props.name)}</StatName>
			<StatValue>{props.baseStatValue}</StatValue>
			<StatBar $isTotal={props.isTotal}>
				<StatBarOverlay
					$value={props.baseStatValue}
					$isTotal={props.isTotal}
				></StatBarOverlay>
			</StatBar>
		</StatContainer>
	);
}
