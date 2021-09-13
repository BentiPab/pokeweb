import logo from "../logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li>
          <Link to="/">
            <picture>
              <source srcSet={logo} media="(min-width: 1200px)" />
              <source srcSet={logo} media="(min-width: 800px)" />
              <img src={logo} alt="logo" />
            </picture>
          </Link>
        </li>
        <li>
          <Link to="/pokemon">Pokemons</Link>
        </li>
        <li>
          <Link to="/abilities">Abilities</Link>
        </li>
        <li>
          <Link to="/berries">Berries</Link>
        </li>
        <li>
          <Link to="/">Something else</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
