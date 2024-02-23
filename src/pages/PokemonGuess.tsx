import { useEffect, useState } from "react";
import { getPokemonGameList, PokemonGuessInfo } from "../functions/api/singleApiCalls/getPokemonGameList";
import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import * as breakpoints from "../objects/breakpoints";

export function PokemonGuess() {
    const [pokemonChoices, setPokemonChoices] = useState<PokemonGuessInfo[]>([]);
    const [correctPokemon, setCorrectPokemon] = useState<PokemonGuessInfo>();
    const { pokemons, fetchPokemons, pending } = getPokemonGameList();
    const [isReveal, setIsReveal] = useState<boolean>(false);
    function shuffle(arr: Array<any>) {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function setupGame() {
        const choices = shuffle(pokemons).slice(0, 4);
        const [correct] = choices;
        setCorrectPokemon(correct);
        setPokemonChoices(shuffle(choices));
    }

    function handleChoice(pokemonName: string) {
        const updated = pokemonChoices.map((item) => {
            if (item.pokemonName == pokemonName && pokemonName == correctPokemon?.pokemonName) {
                return {
                    ...item,
                    colour: "green"
                };
            } else if (item.pokemonName == pokemonName) {
                return {
                    ...item,
                    colour: "red"
                };
            } else {
                return item;
            }
        });
        setPokemonChoices(updated);
        if (pokemonName == correctPokemon?.pokemonName) {
            setIsReveal(true);
            //set up a new game
            setTimeout(async () => {
                await fetchPokemons();
            }, 3000);
        }
    }

    useEffect(() => {
        if (pending) {
            return;
        }
        setupGame();
        setIsReveal(false);
    }, [pokemons]);

    return (
        <Container>
            <Wrapper>
                <Title>Who is that Pokemon ?</Title>
                <ImageContainer>
                    <HiddenImage $isOpen={isReveal} style={{ filter: `brightness(${isReveal ? 1 : 0})` }}>
                        <PokemonImage href={correctPokemon?.pokemonSprite} />
                    </HiddenImage>
                </ImageContainer>
                <Choices>
                    {pokemonChoices &&
                        pokemonChoices.map((item: PokemonGuessInfo, idx) => (
                            <ChoiceButton
                                key={idx}
                                onClick={() => !isReveal && handleChoice(item.pokemonName)}
                                style={{ background: item.colour }}
                            >
                                <h1>{capitalizeWords(item.pokemonName)}</h1>
                            </ChoiceButton>
                        ))}
                </Choices>
            </Wrapper>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex: 1 1 0;
    overflow: hidden;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0 12vw;
        background-color: #1b252f;
    }
`;

const Wrapper = styled(ContainerPrototype)`
    flex-direction: column;
    padding: 0 1rem;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        background-color: white;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    flex: 0 0 content;
    line-height: 3rem;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 4rem;
        line-height: 4rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        margin-top: 1rem;
        text-align: center;
        font-size: 4.5rem;
    }
`;

const ChoiceButton = styled.button`
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    display: inline-block;
    white-space: break-spaces;
    font-size: 1em;
    font-weight: 500;
    line-height: 1em;
    list-style: none;
    margin: 0;
    padding: 0.6rem;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    //white-space: nowrap;
    user-select: none;
    touch-action: manipulation;
    width: 100%;
    height: 100%;
    flex: 1 0 content;
`;

const Choices = styled(ContainerPrototype)`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 25%;
    column-gap: 10px;
    row-gap: 10px;
    text-align: center;
    padding: 0 1rem 1rem;
    //margin-bottom: 1rem;
    overflow: hidden;
    flex: 1 0 content;
`;

const ImageContainer = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
    //justify-content: space-around;
    flex: 0 1 content;
    overflow: hidden;
`;

const PokemonImage = styled.image`
    width: 100%;
    height: 100%;
    border: solid black;
    border: none;
`;

const HiddenImage = styled.svg.attrs({ viewBox: "0 0 100 100 " })<{ $isOpen: boolean }>`
    width: 100%;
    height: 100%;
    transition: filter ${(props) => (props.$isOpen ? 2 : 0)}s ease-out;
`;
