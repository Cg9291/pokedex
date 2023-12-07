import axios from "axios";
import { PokemonInterface } from "../../../interfaces/pokemonInterface";
import { useEffect, useState } from "react";
import { endpoints } from "../../../objects/endpoints";

export type PokemonGuessInfo = {
    pokemonName: string;
    pokemonSprite: string;
    colour: string;
};

type PokemonListResponse = {
    name: string;
    url: string;
};
const FIRST_GEN_COUNT = 151;

export function getPokemonGameList() {
    const [pokemons, setPokemons] = useState<PokemonGuessInfo[]>([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        (async () => {
            await fetchPokemons(FIRST_GEN_COUNT);
        })();
    }, []);

    async function fetchPokemons(limit: number = FIRST_GEN_COUNT) {
        try {
            setPending(true);
            const res = await axios.get(endpoints.pokemonList(limit));
            if (res.data) {
                const _pokemons = res.data.results.map((item: PokemonListResponse) => {
                    const separated = item.url.split("/");
                    return {
                        pokemonName: item.name,
                        // url contains the id of the Pokemon
                        pokemonSprite: endpoints.sprite(separated[separated.length - 2]),
                        colour: "linear-gradient(180deg, #4b91f7 0%, #367af6 100%)"
                    };
                });
                setPokemons(_pokemons);
            }
        } catch (err) {
            console.log("Failed to pull list of pokemons", err);
        } finally {
            setPending(false);
        }
    }

    return {
        pokemons,
        pending,
        fetchPokemons
    };
}
