import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getPokemonData } from "../api/singleApiCalls/getPokemonData";
import { useNavigate } from "react-router-dom";

export const useHandleSearchSubmission = (
    searchInput: string,
    suggestedInput?: string,
    usesNavigation?: boolean,
    hasSuggestions?: boolean,
    e?: React.FormEvent<HTMLFormElement>
) => {
    const [searchedPokemonId, setSearchedPokemonId] = useState<number | string | null>(null);
    const [searchError, setSearchError] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        e &&
            (async () => {
                await handleSub(e);
            })();
    }, []);

    const handleSub = async (e: React.FormEvent<HTMLFormElement>) => {
        if (hasSuggestions && suggestedInput) {
            if (usesNavigation) {
                navigate(`/pokemons/name/${suggestedInput}`);
            } else {
                try {
                    e.preventDefault();
                    setIsSearching(true);
                    const pokemonData = await getPokemonData(suggestedInput);
                    setSearchedPokemonId(pokemonData.id);
                } catch (err) {
                    if (err instanceof AxiosError && err.response?.status === 404) {
                        setSearchError(true);
                    }
                } finally {
                    setIsSearching(false);
                }
            }
        } else {
            const formData = new FormData(e.currentTarget);
            const transmittedData = Object.fromEntries(formData.entries());
            const identifier = isNaN(Number(transmittedData.searchInput))
                ? transmittedData.searchInput.toString().toLowerCase()
                : Number(transmittedData.searchInput);
            console.log(identifier);

            if (usesNavigation) {
                navigate(
                    typeof identifier === "number" ? `/pokemons/id/${identifier}` : `/pokemons/name/${identifier}`
                );
            } else {
                e.preventDefault();
                setSearchedPokemonId(identifier);
            }
        }
    };

    return { handleSub, searchedPokemonId, searchError, isSearching };
};
