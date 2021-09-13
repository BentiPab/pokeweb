import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import P from "../Pokedex";
import CardSkeleton from "./CardSkeleton";

const PokemonCard = ({ pokemonName }) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState();
  const [pokemonType, setPokemonType] = useState([]);

  useEffect(() => {
    getData();
    async function getData() {
      setLoading(true);
      const res = await P.getPokemonByName(pokemonName);
      setPokemon(res);
      const types = res.types;
      const typeList = [];
      types.forEach((type) => {
        typeList.push(type.type.name);
      });
      setPokemonType(typeList);
      setLoading(false);
    }
  }, [pokemonName]);

  const renderPokemonName = () => {
    const name = pokemon.name.slice(1, pokemon.name.length);
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + name;
    return (
      <h6 className="pokemon-name"> {pokemonName}</h6>
    )
    };

  return (
    <div className="pokemon-card">
      {loading ? (
        <CardSkeleton />
      ) : (
        <div>
          <div className="pokeHeader">
            {pokemonType.map((type) => (
              <div className={type}></div>

            ))}
            <h6 className="pokemon-id">#{`${pokemon.id}`}</h6>
          </div>
          <img 
          className="pokemon-img"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt="pokemon"
          />
          {renderPokemonName()}
        </div>
      )}
    </div>
  );
};

export default withRouter(PokemonCard);
