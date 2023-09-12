import axios from "axios";

export default async function getPokemonData(id: Number): return axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res => {
			const parsedData = res.data;
			const pokemonImageUrl = parsedData.sprites.front_default;
			return pokemonImageUrl;
		})
		.catch(err => {
			console.log("Failure", err);
		})
		.finally(() => console.log("Done"))

//just here for learning purpose

/*Promise {
	try {
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${id}/`,
		);
		const data = await response.json();
		const responseData: String = response.data.sprites.front_default;
		console.log(responseData);
		//return responseData;
	} catch (err) {
		console.log("Failure", err);
	} */
}
