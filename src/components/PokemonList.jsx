import { useEffect, useState } from "react";
import P from "../Pokedex.js";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import CardSkeleton from "./CardSkeleton.jsx";
import { paginate } from "./utils/paginate.js";
import Pagination from "./Pagination.jsx";
import SearchBox from "./SearchBox.jsx";
import SideBar from "./Sidebar.jsx";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const pageSize = 100;

  useEffect(() => {
    getData();
    async function getData() {
      setLoading(true);
      const res = await P.getPokemonsList();
      getPagedData(res.results, res.count);
      setLoading(false);
    }

    const getPagedData = async (pokeList) => {
      let filtered = pokeList;
      console.log(selectedType);
      if (selectedType) {
        const { pokemon } = await P.getTypeByName(selectedType);
        filtered = pokemon.map(({ pokemon }) => ({ name: pokemon.name }));
      }

      if (searchQuery) {
        filtered = filtered.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(searchQuery, filtered);
      }

      const pokemonsList = paginate(filtered, currentPage, pageSize);
      setPokemonList(pokemonsList);
      setTotalCount(filtered.length);
    };
  }, [currentPage, searchQuery, selectedType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTypeFilter = (types) => {
    setSelectedType(types);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const renderLoading = () => {
    const skeletonArray = [];
    for (let i = 0; i < pageSize; i++) {
      skeletonArray[i] = (
        <div className="pokemon-card">
          <CardSkeleton />
        </div>
      );
    }

    return skeletonArray.map((skeleton) => skeleton);
  };

  const renderContent = () => {
    if (loading) {
      renderLoading();
    } else {
      return pokemonList.map((pokemon) => (
        <Link to={`/pokemon/${pokemon.name}`}>
          <PokemonCard pokemonName={pokemon.name} />
        </Link>
      ));
    }
  };

  return (
    <div className="grid-wrapper">
      <SideBar onTypeFilter={handleTypeFilter} />

      <SearchBox
        className="searchbox-container"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="main-content">{renderContent()}</div>
      <Pagination
        currentPage={currentPage}
        itemsCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PokemonList;
