const mongoose = require("mongoose");
const {
  getAllCartsController,
  getCartByIdController,
  //createCartController,
  addToCartController, 
  updateCartController,
  deleteCartController,
} = require("../controllers/cartControllers");

// Handler para obtener todos los carritos
const getCarts = async (req, res) => {
  try {
    const carts = await getAllCartsController();
    res.status(200).json({
      message: "Todos los carritos obtenidos",
      carts,
    });
  } catch (error) {
    console.error("Error al obtener los carritos:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al obtener los carritos",
      error: error.message,
    });
  }
};

// Handler para obtener un carrito por ID
const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de carrito no válido" });
    }

    const cart = await getCartByIdController(id);

    if (cart) {
      res.status(200).json({
        message: "Carrito encontrado",
        cart,
      });
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al obtener el carrito",
      error: error.message,
    });
  }
};

// Handler para agregar un nuevo carrito
// const addCart = async (req, res) => {
//   try {
//     const { products } = req.body;

//     if (!products || products.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "El carrito debe tener productos" });
//     }

//     const userId = req.user.id; // Obtener el ID del usuario autenticado
//     const newCart = await createCartController(userId, products);

//     res.status(201).json({
//       message: "Carrito creado con éxito",
//       cart: newCart,
//     });
//   } catch (error) {
//     console.error("Error al crear el carrito:", error.message);
//     res.status(500).json({
//       message: "Ocurrió un error al crear el carrito",
//       error: error.message,
//     });
//   }
// };

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Asumiendo que el ID del usuario está en la solicitud (req.user.id)

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "El producto y la cantidad son obligatorios",
      });
    }

    // Llamar al controlador para agregar el producto al carrito
    const updatedCart = await addToCartController(userId, productId, quantity);

    res.status(201).json({
      message: "Producto agregado al carrito con éxito",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error al agregar al carrito:", error.message);
    res.status(500).json({
      message: "Error al agregar el producto al carrito",
      error: error.message,
    });
  }
};

// Handler para editar un carrito existente
const editCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de carrito no válido" });
    }

    const updatedCart = await updateCartController(id, req.body);

    if (updatedCart) {
      res.status(200).json({
        message: "Carrito actualizado con éxito",
        cart: updatedCart,
      });
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al editar el carrito:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al editar el carrito",
      error: error.message,
    });
  }
};

// Handler para eliminar un carrito
const removeCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de carrito no válido" });
    }

    const deletedCart = await deleteCartController(id);

    if (deletedCart) {
      res.status(200).json({ message: "Carrito eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el carrito:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al eliminar el carrito",
      error: error.message,
    });
  }
};

module.exports = {
  getCarts,
  getCart,
  //addCart,
  editCart,
  removeCart,
  addToCart,
};
