import "./App.css";
import "@fontsource/roboto";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Food from "./pages/Food";
import FoodAdd from "./pages/FoodAdd";
import Transaksi from "./pages/Transaksi";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/food" element={<Food />} />
        <Route path="/food/add" element={<FoodAdd />} />
        <Route path="/transaksi" element={<Transaksi />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
