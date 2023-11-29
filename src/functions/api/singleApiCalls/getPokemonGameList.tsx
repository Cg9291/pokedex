import axios from "axios";
import { PokemonInterface } from "../../../interfaces/pokemonInterface";
import { useEffect, useState } from "react";
import { endpoints } from "../../../objects/endpoints";

export type PokemonGuessInfo = {
    pokemonName: string;
    pokemonSprite: string;
};

type PokemonListResponse = {
    name: string;
    url: string;
};

export function getPokemonGameList(limitNum?: number) {
    const [pokemons, setPokemons] = useState<PokemonGuessInfo[]>([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        (async () => {
            await fetchPokemons(limitNum ? limitNum : 151);
        })();
    }, []);

    async function fetchPokemons(limit: number) {
        try {
            setPending(true);
            const res = await axios.get(endpoints.pokemonList(limit));
            if (res.data) {
                const _pokemons = res.data.results.map((item: PokemonListResponse) => {
                    const separated = item.url.split("/");

                    return {
                        pokemonName: item.name,
                        // url contains the id of the Pokemon
                        pokemonSprite: endpoints.sprite(separated[separated.length - 2])
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
