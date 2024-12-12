// Función para obtener productos
// const getProducts = (req, res) => {
//   res.send('Aquí están los productos');
// };

// module.exports = { getProducts };

// const {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productControllers");

// const getProducts = (req, res) => {
//   const products = getAllProducts();
//   res.json(products);
// };

// const getProduct = (req, res) => {
//   const product = getProductById(parseInt(req.params.id));
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).json({ message: "Producto no encontrado" });
//   }
// };

// const addProduct = (req, res) => {
//   const newProduct = req.body;
//   const product = createProduct(newProduct);
//   res.status(201).json(product);
// };

// const editProduct = (req, res) => {
//   const updatedProduct = updateProduct(parseInt(req.params.id), req.body);
//   if (updatedProduct) {
//     res.json(updatedProduct);
//   } else {
//     res.status(404).json({ message: "Producto no encontrado" });
//   }
// };

// // const removeProduct = (req, res) => {
// //   const deletedProduct = deleteProduct(parseInt(req.params.id));
// //   if (deletedProduct) {
// //     res.json({ message: 'Producto eliminado' });
// //   } else {
// //     res.status(404).json({ message: 'Producto no encontrado' });
// //   }
// // };

// const removeProduct = (req, res) => {
//   const deletedProduct = deleteProduct(parseInt(req.params.id)); // Convierte el ID a número
//   if (deletedProduct) {
//     res.json({ message: "Producto eliminado" });
//   } else {
//     res.status(404).json({ message: "Producto no encontrado" });
//   }
// };

// module.exports = {
//   getProducts,
//   getProduct,
//   addProduct,
//   editProduct,
//   removeProduct,
// };
// /------------------------------------------------------------- CONSIGNA 5-------------------------------------------

//const Joi = require("joi");
const mongoose = require("mongoose");
const {
  getAllProductsController,
  getProductByIdController,
  getProductByNameController,
  createProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productControllers");
const Product = require("../models/Product");

// // Esquema de validación para los productos por JOI


// const productSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   price: Joi.number().min(0).required(),
// });

// // Handler para obtener todos los productos
// const getProducts = (req, res) => {
//   try {
//     const products = getAllProductsController(); // Llamada al controlador
//     res.json(products); // Respuesta con los productos
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Ocurrió un error al obtener los productos.");
//   }
// };

// // Handler para obtener un producto por ID
// const getProduct = (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);
//     const product = getProductByIdController(productId); // Llamada al controlador

//     if (product) {
//       res.json(product); // Respuesta con el producto
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Ocurrió un error al obtener el producto.");
//   }
// };

////  // Handler para obtener todos los productos/id / nombre ?

const getProducts = async (req, res) => {
  try {
    const { id, name } = req.query;

    // Buscar por ID
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "El ID proporcionado no es válido",
        });
      }
      const product = await getProductByIdController(id);
      if (!product) {
        return res.status(404).json({
          message: `Producto con ID "${id}" no encontrado`,
        });
      }
      return res.status(200).json({
        message: "Producto encontrado",
        product,
      });
    }

    // Buscar por nombre
    if (name) {
      const products = await getProductByNameController(name);
      if (!products.length) {
        return res.status(404).json({
          message: `Producto con nombre "${name}" no encontrado`,
        });
      }
      return res.status(200).json({
        message: `Productos encontrados para el nombre "${name}"`,
        products,
      });
    }

    // Obtener todos los productos si no se especifica ID ni nombre
    const products = await getAllProductsController();
    return res.status(200).json({
      message: "Todos los Productos obtenidos",
      products,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({
      message: "Error interno al obtener los Productos",
      error: error.message,
    });
  }
};

// Handler para agregar un nuevo producto
const addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const userId = req.user.id; // Obtener el `userId` del usuario autenticado
    const newProduct = await createProductController({
      name,
      price,
      stock,
      userId,
    });

    res.status(201).json({
      message: "Producto creado con éxito",
      product: newProduct,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        details: err.message,
      });
    }

    console.error(err.message);
    res.status(500).json({
      message: "Ocurrió un error al crear el producto",
      error: err.message,
    });
  }
};

// Handler para editar un producto existente  
// const editProduct = (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);
//     const updatedProduct = updateProductController(productId, req.body); // Llamada al controlador

//     if (updatedProduct) {
//       res.json(updatedProduct); // Respuesta con el producto actualizado
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Ocurrió un error al editar el producto.");
//   }
// };
//////////////////////////consigna 8 ///////////////
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de producto no válido" });
    }

    const updatedProduct = await updateProductController(id, req.body);

    if (updatedProduct) {
      return res.status(200).json({
        message: "Producto actualizado con éxito",
        product: updatedProduct,
      });
    } else {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al editar producto:", error.message);
    return res.status(500).json({
      message: "Ocurrió un error al editar el producto",
      error: error.message,
    });
  }
};


// Handler para eliminar un producto
// const removeProduct = (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);
//     const deletedProduct = deleteProductController(productId); // Llamada al controlador

//     if (deletedProduct) {
//       res.json({ message: "Producto eliminado" }); // Respuesta confirmando la eliminación
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Ocurrió un error al eliminar el producto.");
//   }
// };
//////////////////////////consigna 8 ////////////////// mongoose 
const removeProduct = (req, res) => {
  try {
    const productId = req.params.id;
    // const userId = parseInt(req.params.id);

    // Verificar si el `id` es un ObjectId válido  /////consigna 8
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID de producto no válido" });
    }

    const deletedProduct = deleteProductController(productId);
    if (deletedProduct) {
      res.json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ocurrió un error al eliminar el producto.");
  }
};

module.exports = {
  getProducts,
  //getProduct,
  addProduct,
  editProduct,
  removeProduct,
};
