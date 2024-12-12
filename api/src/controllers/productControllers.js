// const { products } = require('../baseDatos');

// // Obtener todos los productos
// const getAllProducts = () => {
//     return products;
// };

// // Obtener un producto por ID
// const getProductById = (id) => {
//     return products.find((product) => product.id === id);
// };

// // Crear un nuevo producto
// const createProduct = (newProduct) => {
//     products.push(newProduct);
//     return newProduct;
// };

// // Actualizar un producto
// const updateProduct = (id, updatedData) => {
//     const index = products.findIndex((product) => product.id === id);
//     if (index !== -1) {
//         products[index] = { ...products[index], ...updatedData };
//         return products[index];
//     }
//     return null;
// };

// // // Eliminar un producto
// // const deleteProduct = (id) => {
// //     const index = products.findIndex((product) => product.id === id);
// //     if (index !== -1) {
// //         return products.splice(index, 1);
// //     }
// //     return null;
// // };

// // Eliminar un producto
// // const deleteProduct = (id) => {
// //     const productIndex = products.findIndex(product => product.id === id);
// //     if (productIndex !== -1) {
// //         const deletedProduct = products[productIndex];
// //         products.splice(productIndex, 1);
// //         return deletedProduct;
// //     }
// //     return null;
// // };

// // Función para eliminar producto
// const deleteProduct = (id) => {
//     const productIndex = products.findIndex(product => product.id === id);
//     if (productIndex !== -1) {
//         const deletedProduct = products.splice(productIndex, 1);
//         return deletedProduct[0];
//     } else {
//         return null; // Si no encuentra el producto
//     }
// };

// module.exports = {
//     getAllProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,
// };

// --------------------------------CONSIGNA 5 --------------------------------------------------------

// // controllers/productControllers.js
// const { products } = require("../baseDatos");

// const getAllProductsController = () => {
//   return products;
// };

// const getProductByIdController = (id) => {
//   return products.find((product) => product.id === id);
// };

// const createProductController = (newProductData) => {
//   const newProduct = { id: products.length + 1, ...newProductData };
//   products.push(newProduct);
//   return newProduct;
// };

// const updateProductController = (id, updatedProductData) => {
//   const productIndex = products.findIndex((product) => product.id === id);
//   if (productIndex !== -1) {
//     products[productIndex] = {
//       ...products[productIndex],
//       ...updatedProductData,
//     };
//     return products[productIndex];
//   }
//   return null;
// };

// const deleteProductController = (id) => {
//   const productIndex = products.findIndex((product) => product.id === id);
//   if (productIndex !== -1) {
//     return products.splice(productIndex, 1);
//   }
//   return null;
// };

// module.exports = {
//   getAllProductsController,
//   getProductByIdController,
//   createProductController,
//   updateProductController,
//   deleteProductController,
// };

/////////////////consigna 8 usar mongo db //////////////////

const Product = require("../models/Product");

// controller Obtener todos los productos
const getAllProductsController = async () => {
  try {
    const products = await Product.find().populate("userId", "name"); // Populate para incluir datos de los productos
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos: " + error.message);
  }
};

// Obtener un producto por ID
const getProductByIdController = async (id) => {
  try {
    const product = await Product.findById(id).populate("userId", "name");
    return product;
  } catch (error) {
    throw new Error("Error al obtener el producto por ID: " + error.message);
  }
};

// Obtener un producto por nombre
const getProductByNameController = async (name) => {
  try {
    const products = await Product.find({ name: new RegExp(name, "i") }).populate(
      "userId",
      "name"
    );
    return products;
  } catch (error) {
    throw new Error("Error al obtener productos por nombre: " + error.message);
  }
};


// Crear un nuevo producto
const createProductController = async (newProductData) => {
  try {
    // Verificar si el producto ya existe por nombre
    const existingProduct = await Product.findOne({
      name: newProductData.name,
    });

    if (existingProduct) {
      throw new Error(
        `El producto con el nombre "${newProductData.name}" ya existe.`
      );
    }

    const newProduct = new Product(newProductData); // Crear instancia de Mongoose
    await newProduct.save(); // Guardar en la base de datos
    console.log("Producto creado con éxito:", newProduct);
    return newProduct;
  } catch (error) {
    throw new Error("Error al crear el producto: " + error.message);
  }
};

// Actualizar un producto existente  con JOI
// const updateProductController = async (id, updatedProductData) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       updatedProductData,
//       {
//         new: true, // Retorna el producto actualizado
//         runValidators: true, // Aplica las validaciones del esquema
//       }
//     ).populate("userId"); // Incluye detalles del usuario relacionado
//     if (!updatedProduct) {
//       throw new Error("Producto no encontrado");
//     }
//     return updatedProduct;
//   } catch (error) {
//     throw new Error("Error al actualizar el producto: " + error.message);
//   }
// };


//////////////////////////consigna 8 /////////////// mongoose 


const updateProductController = async (id, updatedProductData) => {
  try {
    // Asegurarse de que el ID sea tratado como string (no número)
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      {
        new: true, // Retorna el producto actualizado
        runValidators: true, // Aplica las validaciones del esquema
      }
    ).populate("userId");

    if (!updatedProduct) {
      throw new Error("Producto no encontrado");
    }
    return updatedProduct;
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error.message);
  }
};





// Eliminar un producto
const deleteProductController = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Producto no encontrado");
    }
    return deletedProduct;
  } catch (error) {
    throw new Error("Error al eliminar el producto: " + error.message);
  }
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  getProductByNameController,
  createProductController,
  updateProductController,
  deleteProductController,
};
