import axios from "axios";

export default function getPokemonData(id: Number): Promise {
	let pokemonImageUrl = "";
	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res => {
			let parsedData = res.data;
			//console.log(res.data);
			pokemonImageUrl = parsedData.sprites.front_default;
			//console.log(pokemonImageUrl);
		})
		.catch(err => {
			console.log("Failure", err);
		})
		.finally(() => console.log("Done") /* console.log("Call is complete") */); //just here for learning purpose
	return pokemonImageUrl;
}
