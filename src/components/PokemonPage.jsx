import { withRouter } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import P from "../Pokedex";

const PokemonPage = (props) => {
  const [pokemon, setPokemon] = useState({});
  const [imageSrc, setImageSrc] = useState();
  const [species, setSpecies] = useState();
  const [loading, setLoading] = useState(true);
  const [evolutionChain, setEvolutionChain] = useState();
  useEffect(() => {
    setLoading(true);
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const name = props.match.params.id;
    const pokemon = await P.getPokemonByName(name);
    const species = await P.getPokemonSpeciesByName(name);
    const evolutionChain = await P.getEvolutionChainById(pokemon.id);
    setImageSrc(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    );
    setPokemon(pokemon);
    setSpecies(species);
    setLoading(false);
    setEvolutionChain(evolutionChain);
    console.log(evolutionChain.chain);
  };

  return (
    <div>
      {!loading ? (
        <div>
          <img src={imageSrc} alt={`${pokemon.name}-img`} />
          <h4>{pokemon.name}</h4>
          <ul>
            {pokemon.stats.map((stat) => (
              <li>
                {stat.stat.name} {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(PokemonPage);
