import axios from "axios";
import PokemonInterface from "../../interfaces/pokemonInterface";

export default async function getPokemonData(pokemonIdentifier: number | string): Promise<PokemonInterface> {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`);
        const pokemonData: PokemonInterface = response.data;
        return pokemonData;
    } catch (err) {
        console.log("function getPokemonData:failure", err);
        throw err;
    }
}

/* export default function getPokemonData(
	id: number,
	stateSetter: React.Dispatch<React.SetStateAction<{}>>,
): Promise<PokemonInfo> {
	return axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res => {
			const parsedData: PokemonInfo = res.data;
			stateSetter(prevObj => ({ ...prevObj, ...parsedData }));
			console.log(parsedData);
		})
		.catch(err => {
			console.log("Failure", err);
		})
		.finally(() => console.log("Done")); //just here for learning purpose
} */
