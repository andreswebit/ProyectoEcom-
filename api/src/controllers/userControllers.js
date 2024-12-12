// const { users } = require('../baseDatos');

// const getAllUsers = () => users;
// const getUserById = (id) => users.find((user) => user.id === id);
// const createUser = (newUser) => {
//     users.push(newUser);
//     return newUser;
// };
// const updateUser = (id, updatedData) => {
//     const index = users.findIndex((user) => user.id === id);
//     if (index !== -1) {
//         users[index] = { ...users[index], ...updatedData };
//         return users[index];
//     }
//     return null;
// };
// const deleteUser = (id) => {
//     const index = users.findIndex((user) => user.id === id);
//     if (index !== -1) {
//         return users.splice(index, 1);
//     }
//     return null;
// };

// module.exports = {
//     getAllUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser
// };

// -------------------------------------consigan  5  ---------------------------------------

// const { users } = require("../baseDatos");

// const getAllUsersController = () => {
//   return users;
// };

// const getUserByIdController = (id) => {
//   return users.find((user) => user.id === id);
// };

// const createUserController = (newUserData) => {
//   const newUser = { id: users.length + 1, ...newUserData };
//   users.push(newUser);
//   return newUser;
// };
// const updateUserController = (id, updatedData) => {
//   const index = users.findIndex((user) => user.id === id);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...updatedData };
//     return users[index];
//   }
//   return null;
// };
// const deleteUserController = (id) => {
//   const index = users.findIndex((user) => user.id === id);
//   if (index !== -1) {
//     return users.splice(index, 1);
//   }
//   return null;
// };

// module.exports = {
//   getAllUsersController,
//   getUserByIdController,
//   createUserController,
//   updateUserController,
//  deleteUserController,
// };

//////// consigna 8 interctuarcon mongo db ////////////////////////

const User = require("../models/User");

// Obtener todos los usuarios
const getAllUsersController = async () => {
  try {
    const users = await User.find(); // Obtiene todos los usuarios de la base de datos
    return users;
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
};

// Obtener un usuario por ID
const getUserByIdController = async (id) => {
  try {
    const user = await User.findById(id); // Busca un usuario por su ID
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};
// Controlador para obtener un usuario por nombre
// Obtener un usuario por nombre
const getUserByNameController = async (name) => {
  try {
    const user = await User.find({ name: new RegExp(`^${name}$`, "i") }); // Búsqueda case-insensitive
    if (!user || user.length === 0) {
      return null; // Retornar null si no se encuentra el usuario
    }
    return user; // Retorna el usuario encontrado
  } catch (error) {
    throw new Error("Error al buscar usuario por nombre: " + error.message);
  }
};

// Crear un nuevo usuario

const createUserController = async (newUserData) => {
  try {
    const newUser = new User(newUserData);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error de MongoDB:", error);
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

// Actualizar un usuario existente
const updateUserController = async (id, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Retorna el documento actualizado
      runValidators: true, // Aplica validaciones definidas en el esquema
    });
    if (!updatedUser) {
      throw new Error("Usuario no encontrado");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

// Eliminar un usuario
const deleteUserController = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id); // Elimina el usuario por su ID
    if (!deletedUser) {
      throw new Error("Usuario no encontrado");
    }
    return deletedUser;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  getUserByNameController,
  createUserController,
  updateUserController,
  deleteUserController,
};
