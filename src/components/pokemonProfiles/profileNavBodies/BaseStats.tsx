import React from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { StatsInterface } from "../../../interfaces/miscInterfaces";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { BaseStatsComponentProps } from "../../../interfaces/miscInterfaces";

interface StatsOverlayPropsInt {
    $value: number;
    $isTotal: boolean | undefined;
}

interface StatsComparisonOverlayInterface {
    $firstPokemonStatValue: number;
    $secondPokemonStatValue: number;
    $currentPokemon: number;
}

interface LocalStat {
    name: string;
    baseStatValue: number;
    baseStatValue2?: number;
    isTotal?: boolean;
    isComparison?: boolean;
}

export function BaseStats(props: {
    pokemonStatsProps: BaseStatsComponentProps;
    secondPokemonStatsProps?: BaseStatsComponentProps;
}): React.ReactElement {
    const { pokemonStatsProps: pokemonStats, secondPokemonStatsProps: secondPokemonStats } = props;

    const statsTotal = () => {
        let total = 0;
        for (let i = 0; i < pokemonStats.stats.length; i++) {
            total += pokemonStats.stats[i]["base_stat"];
        }
        return total;
    };

    const mapStats = (): React.ReactElement[] => {
        if (props.secondPokemonStatsProps) {
            const StatsArray = [];
            for (let i = 0; i < pokemonStats.stats.length; i++) {
                StatsArray.push(
                    <Stat
                        name={pokemonStats.stats[i].stat.name}
                        baseStatValue={pokemonStats.stats[i].base_stat}
                        baseStatValue2={secondPokemonStats?.stats[i].base_stat}
                        key={pokemonStats.stats[i].stat.name}
                        isComparison={true}
                    />
                );
            }
            return StatsArray;
        } else
            return pokemonStats.stats.map((x: StatsInterface) => (
                <Stat name={x.stat.name} baseStatValue={x.base_stat} key={x.stat.name} />
            ));
    };

    return (
        <Container>
            {mapStats()}
            {!secondPokemonStats && <Stat name="total" baseStatValue={statsTotal()} isTotal={true} />}
        </Container>
    );
}

function Stat(props: LocalStat): React.ReactElement {
    return (
        <StatContainer>
            <StatName>{capitalizeWords(props.name)}</StatName>
            {!props.isComparison && <StatValue>{props.baseStatValue}</StatValue>}
            <StatBar $isTotal={props.isTotal}>
                {props.isComparison && props.baseStatValue && props.baseStatValue2 ? (
                    <StatBarComparisonOverlayContainer>
                        <StatBarComparisonOverlay
                            $firstPokemonStatValue={props.baseStatValue}
                            $secondPokemonStatValue={props.baseStatValue2}
                            $currentPokemon={1}
                        />
                        <StatBarComparisonOverlay
                            $firstPokemonStatValue={props.baseStatValue}
                            $secondPokemonStatValue={props.baseStatValue2}
                            $currentPokemon={2}
                        />
                    </StatBarComparisonOverlayContainer>
                ) : (
                    <StatBarOverlay $value={props.baseStatValue} $isTotal={props.isTotal} />
                )}
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

const StatBarComparisonOverlayContainer = styled.div`
    display: flex;
    min-width: 100%;
    height: 100%;
    //background-color: yellow;
    border-radius: 99px;
`;

const StatBarComparisonOverlay = styled.div<StatsComparisonOverlayInterface>`
    width: ${(props) =>
        props.$currentPokemon === 1
            ? `calc(${
                  (props.$firstPokemonStatValue / (props.$firstPokemonStatValue + props.$secondPokemonStatValue)) * 100
              }%)`
            : `calc(${
                  (props.$secondPokemonStatValue / (props.$firstPokemonStatValue + props.$secondPokemonStatValue)) * 100
              }%)`};
    height: 100%;
    background-color: ${(props) => (props.$currentPokemon === 1 ? "red" : "green")};
    //border-radius: 99px;
`;
