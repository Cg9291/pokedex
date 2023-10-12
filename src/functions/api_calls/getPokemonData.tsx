import axios from "axios";
import { PokemonInfoInterface } from "../../interfaces&types/interfaces.tsx";
//interface needs to be outside function,sometimes exported..meant to be reused

export default async function getPokemonData(
	id: number | string,
): Promise<PokemonInfoInterface> {
	try {
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const pokemonData: PokemonInfoInterface = response.data;
		console.log("function getPokemonData:success", pokemonData);
		return pokemonData;
	} catch (err) {
		console.log("function getPokemonData:success", err);
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
