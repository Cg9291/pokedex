const pokemonLookupNumber = (): number[] => {
	const numberArray: number[] = [];
	const randomNum = (): void => {
		for (let i = 0; i < 6; i++) {
			numberArray.push(Math.floor(Math.random() * (255 - 1) + 1));
		}
	};
	randomNum();
	return numberArray;
};

export default pokemonLookupNumber;
