import { useEffect, useState } from "react";
import { getPokemonGameList, PokemonGuessInfo } from "../functions/api/singleApiCalls/getPokemonGameList";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
export function PokemonGuess() {
    const [pokemonChoices, setPokemonChoices] = useState<PokemonGuessInfo[]>([]);
    const [correctPokemon, setCorrectPokemon] = useState<PokemonGuessInfo>();
    const { pokemons, fetchPokemons, pending } = getPokemonGameList();

    console.log(pokemons);
    function shuffle(arr: Array<any>) {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function setupGame() {
        const choices = shuffle(pokemons).slice(0, 4);
        const [correct] = choices;
        console.log(shuffle(choices), correct);
        setCorrectPokemon(correct);
        setPokemonChoices(shuffle(choices));
    }

    useEffect(() => {
        if (pending) {
            return;
        }
        setupGame();
    }, [pokemons]);

    return (
        <div>
            <h1>Who is that Pokemon!!!!</h1>

            <ImageContainer>
                <HiddenImage>
                    <PokemonImage href={correctPokemon?.pokemonSprite} />
                </HiddenImage>
            </ImageContainer>
            <div>
                {pokemonChoices &&
                    pokemonChoices.map((item: PokemonGuessInfo, idx) => (
                        <div key={idx}>
                            <h1>PokemonName: {item.pokemonName}</h1>
                        </div>
                    ))}
            </div>
        </div>
    );
}

const ImageContainer = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-height: 40%;
`;

const HiddenImage = styled.svg`
    width: 100%;
    height: 50%;
    transform: scale(2.5);
    filter: brightness(0);
    transition: filter 0.5s ease-out;
`;

const PokemonImage = styled.image`
    width: 100%;
    height: 100%;
    border: solid black;
`;
