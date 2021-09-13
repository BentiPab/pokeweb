import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonPage from "./components/PokemonPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/pokemon/:id">
            <PokemonPage />
          </Route>
          <Route path="/pokemon">
            <PokemonList />
          </Route>
          <Redirect from="/" to="/pokemon" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
