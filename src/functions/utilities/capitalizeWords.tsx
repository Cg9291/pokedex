const capitalizeWords = (word: string): string => {
	if (word) {
		let newChar = word[0].toUpperCase();
		let capitalizedName = newChar.concat(word.slice(1, word.length));
		return capitalizedName;
	} else {
		return "error,undefined or invalid parameter";
	}
};

export default capitalizeWords;
