import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoveMoney from "./components/move-money";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moveMoney" element={<MoveMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
