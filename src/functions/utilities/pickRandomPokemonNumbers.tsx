export const pickRandomPokemonNumbers = (): number[] => {
    const numberArray: number[] = [];
    for (let i = 0; i < 6; i++) {
        numberArray.push(Math.floor(Math.random() * (255 - 1) + 1));
    }
    return numberArray;
};
