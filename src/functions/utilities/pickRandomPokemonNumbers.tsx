export const pickRandomPokemonNumbers = (comparator?: boolean): number[] => {
    const numberArray: number[] = [];
    const arrayLengthLimit = comparator ? 2 : 8;
    for (let i = 0; i < arrayLengthLimit; i++) {
        let num: number;
        do {
            num = Math.floor(Math.random() * (255 - 1) + 1);
        } while (numberArray.includes(num));
        numberArray.push(num);
    }

    return numberArray;
};
