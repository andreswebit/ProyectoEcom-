//////////////////////////////////FROMPRODUCT.JSX////////////////////////

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addProduct } from "../redux/slices/productsSlice"; // Importa la acción

// const FormProduct = () => {
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [successMessage, setSuccessMessage] = useState(false); // Estado para mostrar el mensaje de éxito
//   const dispatch = useDispatch();

//   const handleSaveProduct = (e) => {
//     e.preventDefault();

//     // Lógica para agregar el producto
//     const newProduct = {
//       name: productName,
//       price: productPrice,
//     };

//     // Llamamos a la acción de Redux para agregar el producto
//     dispatch(addProduct(newProduct));

//     // Mostrar mensaje de éxito
//     setSuccessMessage(true);

//     // Ocultar mensaje después de 3 segundos
//     setTimeout(() => {
//       setSuccessMessage(false);
//     }, 3000);
//   };

//   return (
//     <form onSubmit={handleSaveProduct}>
//       <input
//         type="text"
//         placeholder="Nombre del producto"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Precio del producto"
//         value={productPrice}
//         onChange={(e) => setProductPrice(e.target.value)}
//       />
//       <button type="submit" className="button-save">
//         Guardar
//       </button>
//       {successMessage && <div className="success-message show">Producto guardado con éxito</div>}
//     </form>
//   );
// };

// export default FormProduct;
import React, { useState } from "react"; 
import { useDispatch } from "react-redux"; 
import { addProduct } from "../redux/slices/productsSlice"; 

const FormProduct = () => { 
    const [productName, setProductName] = useState(""); 
    const [productPrice, setProductPrice] = useState(""); 
    const [productStock, setProductStock] = useState(0); // Nuevo estado para el stock
    const [successMessage, setSuccessMessage] = useState(""); 
    const dispatch = useDispatch(); 

    const handleSaveProduct = (e) => { 
        e.preventDefault(); 
        if (!productName || !productPrice || productStock <= 0) {
            alert("Operación no permitida: todos los campos son obligatorios y el stock debe ser mayor a 0.");
            return;
        }
        
        const newProduct = { 
            id: Date.now(), // Asignar un ID automáticamente
            name: productName, 
            price: parseFloat(productPrice), 
            stock: productStock, 
        }; 
        
        dispatch(addProduct(newProduct)); 
        setSuccessMessage(`Producto guardado con éxito. Stock actual: ${productStock}`);
        
        setTimeout(() => { 
            setSuccessMessage(""); 
        }, 3000); 
    }; 

    return ( 
        <form onSubmit={handleSaveProduct}> 
            <input 
                type="text" 
                placeholder="Nombre del producto" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
            /> 
            <input 
                type="number" 
                placeholder="Precio del producto" 
                value={productPrice} 
                onChange={(e) => setProductPrice(e.target.value)} 
            /> 
            <input 
                type="number" 
                placeholder="Stock del producto" 
                value={productStock} 
                onChange={(e) => setProductStock(e.target.value)} 
                  /> 
                  <button type="submit" className="button-save"> 
                      Guardar 
                  </button> 
                  {successMessage && <div className="success-message show">{successMessage}</div>} 
              </form> 
          ); 
      }; 
      
      export default FormProduct; 
