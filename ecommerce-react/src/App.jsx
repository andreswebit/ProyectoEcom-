import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Usuarios from "./components/Usuarios";
import Usuario from "./components/Usuario";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import sw4 from "./images/sw4.png";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <img src={sw4} alt="Toyota Logo" className="App-logo" />
      <div className="App-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList  />} />
        <Route path="/users" element={<Usuarios />} />
        <Route path="/user/:id" element={<Usuario />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <NavBar />
      <Footer />
    </div>
  </div>
  );
}

export default App;

//////////////consigna 12 ///////////////

// import "./App.css";
// import Header from "./components/Header";
// import ProductList from "./components/ProductList";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <div className="App">
//       <Header />  aca se guarda usuarios y  adentro usuario
//       <ProductList />
//       <Footer />
//     </div>
//   );
// }

// export default App;
