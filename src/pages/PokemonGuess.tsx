import { useEffect, useState } from "react";
import { getPokemonGameList, PokemonGuessInfo } from "../functions/api/singleApiCalls/getPokemonGameList";
import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
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
                            <h1> {item.pokemonName}</h1>
                        </ChoiceButton>
                    ))}
            </Choices>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    display: grid;
    grid-template-rows: 10vh 1fr 30vh;
    max-height: 100%;
`;

const Title = styled.h1`
    text-align: center;
`;

const ChoiceButton = styled.button`
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    touch-action: manipulation;
`;

const Choices = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 25%;
    column-gap: 10px;
    row-gap: 10px;
    text-align: center;
    padding: 0 1rem;
    margin-bottom: 3rem;
`;

const ImageContainer = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-height: 100%;
`;

const PokemonImage = styled.image`
    width: 100%;
    min-height: 100%;
    border: solid black;
`;

const HiddenImage = styled.svg<{ $isOpen: boolean }>`
    width: 100%;
    height: 100%;
    transition: filter ${(props) => (props.$isOpen ? 2 : 0)}s ease-out;
`;
