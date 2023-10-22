import TypesSWInterface from "../interfacesAndTypes/pokemonTypesSWInterface.tsx";

export const typesSW: TypesSWInterface = {
	normal: { strengths: ["none"], weaknesses: ["Fighting"] },
	fire: {
		strengths: ["Bug", "Grass", "Ice", "Steel"],
		weaknesses: ["Ground", "Rock", "Water"],
	},
	water: {
		strengths: ["Fire", "Ground", "Rock"],
		weaknesses: ["Ground", "Rock", "Water"],
	},
	electric: {
		strengths: ["Flying", "Water"],
		weaknesses: ["Ground"],
	},
	grass: {
		strengths: ["Ground", "Rock", "Water"],
		weaknesses: ["Bug", "Fire", "Flying", "Ice", "Poison"],
	},
	ice: {
		strengths: ["Dragon", "Flying", "Grass", "Ground"],
		weaknesses: ["Fighting", "Fire", "Rock", "Steel"],
	},
	fighting: {
		strengths: ["Dark", "Ice", "Normal", "Rock", "Steel"],
		weaknesses: ["Fairy", "Flying", "Psychic"],
	},
	poison: {
		strengths: ["Fairy", "Grass"],
		weaknesses: ["Ground", "Psychic"],
	},
	ground: {
		strengths: ["Electric", "Fire", "Poison", "Rock", "Steel"],
		weaknesses: ["Grass", "Ice", "Water"],
	},
	flying: {
		strengths: ["Bug", "Fighting", "Grass"],
		weaknesses: ["Electric", "Ice", "Rock"],
	},
	psychic: {
		strengths: ["Fighting", "Poison"],
		weaknesses: ["Bug", "Dark", "Ghost"],
	},
	bug: {
		strengths: ["Grass", "Dark", "Psychic"],
		weaknesses: ["Fire", "Flying", "Rock"],
	},
	rock: {
		strengths: ["Bug", "Fire", "Flying", "Ice"],
		weaknesses: ["Fighting", "Grass", "Ground", "Steel", "Water"],
	},
	ghost: {
		strengths: ["Ghost", "Psychic"],
		weaknesses: ["Dark", "Ghost"],
	},
	dragon: {
		strengths: ["Dragon"],
		weaknesses: ["Dragon", "Fairy", "Ice"],
	},
	dark: {
		strengths: ["Ghost", "Psychic"],
		weaknesses: ["Bug", "Fairy", "Fighting"],
	},
	steel: {
		strengths: ["Fairy", "Ice", "Rock"],
		weaknesses: ["Fighting", "Fire", "Ground"],
	},
	fairy: {
		strengths: ["Fighting", "Dark", "Dragon"],
		weaknesses: ["Poison", "Steel"],
	},
};
