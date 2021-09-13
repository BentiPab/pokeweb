const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex({ cacheImages: true });

export default P;
