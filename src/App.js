import "./App.css";
import "@fontsource/roboto";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Food from "./pages/Food";
import FoodAdd from "./pages/FoodAdd";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/food" element={<Food />} />
        <Route path="/food/add" element={<FoodAdd />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
