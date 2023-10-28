import "./App.css";
import { Route, Routes } from "react-router-dom";
import Rockets from "./components/rockets/Rockets";
import Navigation from "./components/shared/Navigation";
import SearchResults from "./components/rockets/SearchResults";

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<Navigation />}></Route>
        {/* <Route index element={<Rockets />}></Route> */}
        <Route path="/search-result" element={<SearchResults />}></Route>
      </Routes>
    </main>
  );
}

export default App;
