export const pickRandomPokemonNumbers = (): number[] => {
    const numberArray: number[] = [];
    for (let i = 0; i < 6; i++) {
        let num: number;
        do {
            num = Math.floor(Math.random() * (255 - 1) + 1);
        } while (numberArray.includes(num));
        numberArray.push(num);
        console.log("pushed" + num);
    }
    console.log(numberArray);
    return numberArray;
};
