import { ReactComponent as Bug } from "../assets/pokemonTypesIcons/bug.svg";
import { ReactComponent as Dark } from "../assets/pokemonTypesIcons/dark.svg";
import { ReactComponent as Dragon } from "../assets/pokemonTypesIcons/dragon.svg";
import { ReactComponent as Electric } from "../assets/pokemonTypesIcons/electric.svg";
import { ReactComponent as Fairy } from "../assets/pokemonTypesIcons/fairy.svg";
import { ReactComponent as Fighting } from "../assets/pokemonTypesIcons/fighting.svg";
import { ReactComponent as Fire } from "../assets/pokemonTypesIcons/fire.svg";
import { ReactComponent as Flying } from "../assets/pokemonTypesIcons/flying.svg";
import { ReactComponent as Ghost } from "../assets/pokemonTypesIcons/ghost.svg";
import { ReactComponent as Grass } from "../assets/pokemonTypesIcons/grass.svg";
import { ReactComponent as Ground } from "../assets/pokemonTypesIcons/ground.svg";
import { ReactComponent as Ice } from "../assets/pokemonTypesIcons/ice.svg";
import { ReactComponent as Normal } from "../assets/pokemonTypesIcons/normal.svg";
import { ReactComponent as Poison } from "../assets/pokemonTypesIcons/poison.svg";
import { ReactComponent as Psychic } from "../assets/pokemonTypesIcons/psychic.svg";
import { ReactComponent as Rock } from "../assets/pokemonTypesIcons/rock.svg";
import { ReactComponent as Steel } from "../assets/pokemonTypesIcons/steel.svg";
import { ReactComponent as Water } from "../assets/pokemonTypesIcons/water.svg";

export interface PokemonTypesIcons {
    [key: string]: {
        icon: React.ReactElement;
        styling: {
            background: string;
            boxShadow: string;
        };
    };
}
export const pokemonTypesIcons: PokemonTypesIcons = {
    bug: {
        icon: <Bug />,
        styling: {
            background: " #92bc2c",
            boxShadow: "0 0 20px #92bc2c"
        }
    },
    dark: {
        icon: <Dark />,
        styling: {
            background: " #595761",
            boxShadow: " 0 0 20px #595761 "
        }
    },
    dragon: {
        icon: <Dragon />,
        styling: {
            background: " #0C69C8",
            boxShadow: "0 0 20px #0C69C8"
        }
    },
    electric: {
        icon: <Electric />,
        styling: {
            background: " #F2D94E",
            boxShadow: "0 0 20px #F2D94E"
        }
    },
    fairy: {
        icon: <Fairy />,
        styling: {
            background: " #EE90E6",
            boxShadow: "0 0 20px #EE90E6"
        }
    },
    fire: {
        icon: <Fire />,
        styling: {
            background: " #FBA54C",
            boxShadow: "0 0 20px #FBA54C"
        }
    },
    flying: {
        icon: <Flying />,
        styling: {
            background: " #A1BBEC",
            boxShadow: "0 0 20px #A1BBEC"
        }
    },
    ghost: {
        icon: <Ghost />,
        styling: {
            background: " #5F6DBC",
            boxShadow: "0 0 20px #5F6DBC"
        }
    },
    grass: {
        icon: <Grass />,
        styling: {
            background: " #5FBD58",
            boxShadow: "0 0 20px #5FBD58"
        }
    },
    ground: {
        icon: <Ground />,
        styling: {
            background: " #DA7C4D",
            boxShadow: "0 0 20px #DA7C4D"
        }
    },
    ice: {
        icon: <Ice />,
        styling: {
            background: " #75D0C1",
            boxShadow: "0 0 20px #75D0C1"
        }
    },
    normal: {
        icon: <Normal />,
        styling: {
            background: " #75D0C1",
            boxShadow: "0 0 20px #75D0C1"
        }
    },
    poison: {
        icon: <Poison />,
        styling: {
            background: " #B763CF",
            boxShadow: "0 0 20px #B763CF"
        }
    },
    psychic: {
        icon: <Psychic />,
        styling: {
            background: " #FA8581",
            boxShadow: "0 0 20px #FA8581"
        }
    },
    rock: {
        icon: <Rock />,
        styling: {
            background: " #C9BB8A",
            boxShadow: "0 0 20px #C9BB8A"
        }
    },
    steel: {
        icon: <Steel />,
        styling: {
            background: " #5695A3",
            boxShadow: "0 0 20px #5695A3"
        }
    },
    water: {
        icon: <Water />,
        styling: {
            background: " #539DDF",
            boxShadow: "0 0 20px #539DDF"
        }
    }
};

export {
    Bug,
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Flying,
    Ghost,
    Grass,
    Ground,
    Ice,
    Normal,
    Poison,
    Psychic,
    Rock,
    Steel,
    Water
};
