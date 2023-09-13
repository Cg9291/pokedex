import axios from "axios";

export default function getPokemonData(id: Number, stateSetter): Promise {
	return axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res => {
			const parsedData = res.data;
			stateSetter(parsedData.sprites.front_default);
			console.log("Success",parsedData);
		})
		.catch(err => {
			console.log("Failure", err);
		})
		.finally(() => console.log("Done")); //just here for learning purpose
}
