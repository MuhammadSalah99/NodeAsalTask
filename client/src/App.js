import "./App.css";
import AddBook from "./pages/AddBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Reserve from "./pages/Reserve";
import Navbar from "./components/Navbar";
import ReserveSeach from "./pages/ReserveSearch";
function App() {
  return (
    <BrowserRouter className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddBook />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/reserve" element={<Reserve />}></Route>
          <Route path="/reserve/:id" element={<ReserveSeach />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
