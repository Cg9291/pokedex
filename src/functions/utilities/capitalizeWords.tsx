const capitalizeWords = (word: string): string => {
    const newChar = word[0].toUpperCase();
    return newChar.concat(word.slice(1, word.length));
};

export default capitalizeWords;
