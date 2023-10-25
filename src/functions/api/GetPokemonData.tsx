import axios from "axios";
import PokemonInterface from "../../interfaces/pokemonInterface";
//interfaces needs to be outside function,sometimes exported..meant to be reused

export default async function GetPokemonData(id: number | string): Promise<PokemonInterface> {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData: PokemonInterface = response.data;

        if (!pokemonData) {
            throw new Error("wrong type");
        } else {
            return pokemonData;
        }
    } catch (err) {
        console.log("function getPokemonData:error", err);
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