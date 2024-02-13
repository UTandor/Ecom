import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductView from "./components/pages/ProductView";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductView />} />
      </Routes>
    </div>
  );
}

export default App;
