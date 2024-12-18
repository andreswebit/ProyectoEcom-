// import React from "react";
// import ReactDOM from "react-dom/client";

// import App from "./App";
// import { BrowserRouter } from "react-router-dom"; // se agrega react dom
// import { CartProvider } from "./components/CartContext"; // consigna

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </BrowserRouter>
// );

//////////consigna 12 /////////

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


/////////////////////////consigana 15 /////////////////////
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store"; // Importa la store de Redux
import { Provider } from "react-redux"; // Provider de Redux
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // React Router para enrutamiento

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
