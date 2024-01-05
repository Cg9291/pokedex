import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getPokemonData } from "../api/singleApiCalls/getPokemonData";
import { useNavigate } from "react-router-dom";
import { NumOrString } from "../../interfaces/miscTypes";

export const useHandleSearchSubmission = (
    searchInput: string,
    suggestedInput: string,
    setSuggestedInput: React.Dispatch<React.SetStateAction<string>>,
    usesNavigation: boolean,
    e?: React.FormEvent<HTMLFormElement>
) => {
    const [searchedPokemonIdentifier, setSearchedPokemonIdentifier] = useState<number | string | null>(null);
    const [searchError, setSearchError] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const navigate = useNavigate();
    const hasSuggestions: boolean = suggestedInput?.length > 0;

    useEffect(() => {
        e &&
            (async () => {
                await handleSub(e);
            })();
    }, [e]);

    const handleSub = async (e: React.FormEvent<HTMLFormElement>) => {
        const handleApiCall = async (pokeIdentifier: NumOrString) => {
            try {
                e.preventDefault();
                setSearchedPokemonIdentifier("");
                setIsSearching(true);
                const pokemonData = await getPokemonData(pokeIdentifier);
                setSearchedPokemonIdentifier(pokemonData.id);
            } catch (err) {
                if (err instanceof AxiosError && err.response?.status === 404) {
                    setSearchError(true);
                }
            } finally {
                setIsSearching(false);
                setSuggestedInput("");
            }
        };

        if (hasSuggestions) {
            if (usesNavigation) {
                //navigates to pokemonProfile component,which handles the Api call internally
                navigate(`/pokemons/name/${suggestedInput}`);
            } else {
                handleApiCall(suggestedInput);
            }
        } else {
            const formData = new FormData(e.currentTarget);
            const transmittedData = Object.fromEntries(formData.entries());
            const identifier = isNaN(Number(transmittedData.searchInput))
                ? transmittedData.searchInput.toString().toLowerCase()
                : Number(transmittedData.searchInput);

            if (usesNavigation) {
                navigate(
                    typeof identifier === "number" ? `/pokemons/id/${identifier}` : `/pokemons/name/${identifier}`
                );
            } else {
                handleApiCall(identifier);
            }
        }
    };

    return { handleSub, searchedPokemonIdentifier, searchError, isSearching };
};
