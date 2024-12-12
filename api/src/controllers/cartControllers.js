const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Obtener todos los carritos
const getAllCartsController = async () => {
  try {
    const carts = await Cart.find()
      .populate("userId", "name")
      .populate("products.productId", "name price");
      

    return carts;
  } catch (error) {
    throw new Error("Error al obtener los carritos: " + error.message);
  }
};

// Obtener un carrito por ID
const getCartByIdController = async (id) => {
  try {
    const cart = await Cart.findById(id)
      .populate("userId", "name")
      .populate("products.productId", "name price");
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    return cart;
  } catch (error) {
    throw new Error("Error al obtener el carrito por ID: " + error.message);
  }
};

// Crear un nuevo carrito
// const createCartController = async (userId, products) => {
//   try {
//     const newCart = new Cart({ userId, products });
//     await newCart.save();
//     return newCart;
//   } catch (error) {
//     throw new Error("Error al crear el carrito: " + error.message);
//   }
// };

const addToCartController = async (userId, productId, quantity) => {
  try {
    // Verificar si el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Buscar el carrito del usuario
    let cart = await Cart.findOne({ userId });

    // Si el carrito no existe, lo creamos
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (productIndex !== -1) {
      // Si el producto ya existe en el carrito, actualizamos la cantidad
      cart.products[productIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, lo agregamos
      cart.products.push({ productId, quantity });
    }

    // Guardar el carrito
    await cart.save();

    // Populamos el carrito para incluir los nombres de los productos
    const populatedCart = await Cart.findById(cart._id).populate(
      "products.productId",
      "name price"
    ); // Poblamos el campo `productId` con `name` y `price`

    return populatedCart;
  } catch (error) {
    throw new Error(
      "Error al agregar el producto al carrito: " + error.message
    );
  }
};

// Actualizar un carrito existente
const updateCartController = async (id, updatedCartData) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, updatedCartData, {
      new: true,
      runValidators: true,
    })
      .populate("userId")
      .populate("products.productId");
    if (!updatedCart) {
      throw new Error("Carrito no encontrado");
    }
    return updatedCart;
  } catch (error) {
    throw new Error("Error al actualizar el carrito: " + error.message);
  }
};

// Eliminar un carrito
const deleteCartController = async (id) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      throw new Error("Carrito no encontrado");
    }
    return deletedCart;
  } catch (error) {
    throw new Error("Error al eliminar el carrito: " + error.message);
  }
};

module.exports = {
  getAllCartsController,
  getCartByIdController,
  addToCartController,
  //createCartController,
  updateCartController,
  deleteCartController,
};
