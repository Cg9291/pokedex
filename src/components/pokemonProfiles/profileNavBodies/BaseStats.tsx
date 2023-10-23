import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { StatsInterface } from "../../../interfaces/miscInterfaces";
import React, { useContext } from "react";
import StatsContext from "../../../contexts/statsContext";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";

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
const StatBarOverlay = styled(ContainerPrototype)<{ $value: number }>`
    width: calc((${(props) => props.$value} / 255) * 100%);
    height: 100%;
    background-color: red;
    border-radius: 99px;
`;

export default function BaseStats(): React.ReactElement {
    const myStatsContext = useContext(StatsContext);
    const mapStats = (): React.ReactElement[] =>
        myStatsContext.map((x: StatsInterface) => (
            <Stat>
                <StatName>{capitalizeWords(x.stat.name)}</StatName>
                <StatValue>{x.base_stat}</StatValue>
                <StatBar>
                    <StatBarOverlay $value={x.base_stat}></StatBarOverlay>
                </StatBar>
            </Stat>
        ));
    return <Container>{mapStats()}</Container>;
}
