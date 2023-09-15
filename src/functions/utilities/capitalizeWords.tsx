const capitalizeWords = (word: string): string => {
	let newChar = word[0].toUpperCase();
	let capitalizedName = newChar.concat(word.slice(1, word.length));
	return capitalizedName;
};

export default capitalizeWords;
