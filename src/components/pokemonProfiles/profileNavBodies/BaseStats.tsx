import React from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components/macro";
import { StatsInterface } from "../../../interfaces/miscInterfaces";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { BaseStatsComponentProps } from "../../../interfaces/miscInterfaces";
import * as breakpoints from "../../../objects/breakpoints";

export interface StatsOverlayPropsInt {
    $value: number;
    $isTotal: boolean | undefined;
}

export interface StatsComparisonOverlayInterface {
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

    const displayStats = (): React.ReactElement[] => {
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
        } else {
            return pokemonStats.stats.map((x: StatsInterface) => (
                <Stat name={x.stat.name} baseStatValue={x.base_stat} key={x.stat.name} />
            ));
        }
    };

    return (
        <Container>
            {displayStats()}
            {!secondPokemonStats && <Stat name="total" baseStatValue={statsTotal()} isTotal={true} />}
        </Container>
    );
}

function Stat(props: LocalStat): React.ReactElement {
    return (
        <StatContainer>
            <StatName>{capitalizeWords(props.name)}</StatName>
            <StatValue $isLeftSide={true}>{props.baseStatValue}</StatValue>
            <StatBar $isTotal={props.isTotal} $isComparison={props.isComparison}>
                {props.isComparison && props.baseStatValue2 ? (
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
            {props.baseStatValue2 && <StatValue>{props.baseStatValue2}</StatValue>}
        </StatContainer>
    );
}

const Container = styled(ContainerPrototype)<{ $isTotal?: boolean; $isComparison?: boolean }>`
    flex-direction: column;
    overflow-y: hidden;
    @media (orientation: landscape) {
        overflow: initial;
    }
`;

const StatContainer = styled(ContainerPrototype)`
    flex: 1 0 0;
    column-gap: 1%;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.3em;
    }
    @media (orientation: landscape) {
        flex: 0 0 25%;
    }
`;
const StatName = styled(ContainerPrototype)`
    flex: 1 0 30%;
    align-items: center;
    font-size: 0.8em;
    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        font-size: 1em;
    }
`;
const StatValue = styled(ContainerPrototype)<{ $isLeftSide?: boolean }>`
    justify-content: ${(props) => (props.$isLeftSide ? "center" : "center")};
    flex: 0 0 10%;
    align-items: center;
    font-size: 0.8em;
    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        font-size: 1em;
    }
`;
const StatBar = styled(ContainerPrototype)<{ $isTotal?: boolean; $isComparison?: boolean }>`
    visibility: ${(props) => (props.$isTotal ? "hidden" : "visible")};
    //min-width: ${(props) => (props.$isComparison ? "55%" : "50%")};
    height: 40%;
    background-color: grey;
    border-radius: 99px;
    align-self: center;
    flex: 0 1 40%;
`;

const StatBarOverlay = styled(ContainerPrototype)<StatsOverlayPropsInt>`
    width: ${(props) =>
        props.$isTotal ? `calc(${(props.$value / 1530) * 100}%)` : `calc(${(props.$value / 255) * 100}%)`};
    background-color: red;
    border-radius: 99px;
`;

const StatBarComparisonOverlayContainer = styled(ContainerPrototype)`
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
`;
