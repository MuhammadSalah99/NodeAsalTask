import "./App.css";
import AddBook from "./pages/AddBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Reserve from "./pages/Reserve";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddBook />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/reserve" element={<Reserve />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
