export default interface TypesSWInterface {
    normal: TypeSWInterface;
    fire: TypeSWInterface;
    water: TypeSWInterface;
    electric: TypeSWInterface;
    grass: TypeSWInterface;
    ice: TypeSWInterface;
    fighting: TypeSWInterface;
    poison: TypeSWInterface;
    ground: TypeSWInterface;
    flying: TypeSWInterface;
    psychic: TypeSWInterface;
    bug: TypeSWInterface;
    rock: TypeSWInterface;
    ghost: TypeSWInterface;
    dragon: TypeSWInterface;
    dark: TypeSWInterface;
    steel: TypeSWInterface;
    fairy: TypeSWInterface;
}

export interface TypeSWInterface {
    strengths: string[];
    weaknesses: string[];
}
