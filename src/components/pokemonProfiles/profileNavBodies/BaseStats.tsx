import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { StatsInterface } from "../../../interfaces/miscInterfaces";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
import { BaseStatsComponentProps } from "../../../interfaces/miscInterfaces";

interface StatsOverlayPropsInt {
    $value: number;
    $isTotal: boolean | undefined;
}

interface LocalStat {
    name: string;
    baseStatValue: number;
    isTotal?: boolean;
}

export default function BaseStats(props: { ownProps: BaseStatsComponentProps }): React.ReactElement {
    const { stats } = props.ownProps;

    const statsTotal = () => {
        let total = 0;
        for (let i = 0; i < stats.length; i++) {
            total += stats[i]["base_stat"];
        }
        return total;
    };

    const mapStats = (): React.ReactElement[] =>
        stats.map((x: StatsInterface) => <Stat name={x.stat.name} baseStatValue={x.base_stat} />);

    return (
        <Container>
            {mapStats()}
            <Stat name="total" baseStatValue={statsTotal()} isTotal={true} />
        </Container>
    );
}

function Stat(props: LocalStat): React.ReactElement {
    return (
        <StatContainer>
            <StatName>{capitalizeWords(props.name)}</StatName>
            <StatValue>{props.baseStatValue}</StatValue>
            <StatBar $isTotal={props.isTotal}>
                <StatBarOverlay $value={props.baseStatValue} $isTotal={props.isTotal}></StatBarOverlay>
            </StatBar>
        </StatContainer>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    padding: 1rem 0 1rem;
    overflow-y: hidden;
`;

const StatContainer = styled.div`
    width: 100%;
    min-height: 2.8rem;
    display: flex;
    justify-content: stretch;
`;
const StatName = styled(ContainerPrototype)`
    min-width: 35%;
`;
const StatValue = styled(ContainerPrototype)`
    justify-content: end;
    min-width: 1%;
    padding-right: 0.8rem;
`;
const StatBar = styled(ContainerPrototype)<{ $isTotal?: boolean }>`
    visibility: ${(props) => (props.$isTotal ? "hidden" : "visible")};
    min-width: 50%;
    height: 30%;
    background-color: grey;
    border-radius: 99px;
    margin-top: 0.3rem;
`;

const StatBarOverlay = styled(ContainerPrototype)<StatsOverlayPropsInt>`
    width: ${(props) =>
        props.$isTotal ? `calc(${(props.$value / 1530) * 100}%)` : `calc(${(props.$value / 255) * 100}%)`};
    height: 100%;
    background-color: red;
    border-radius: 99px;
`;
