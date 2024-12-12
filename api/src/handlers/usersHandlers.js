// // Función para obtener usuarios
// const getUsers = (req, res) => {
//     res.send('Aquí están los usuarios');
//   };

//   module.exports = { getUsers };

// Función para obtener usuarios
// const getUsers = (req, res) => {
// Simular una lista de usuarios
//   const users = [
//     { id: 1, name: 'Andrés', email: 'andres@example.com' },
//     { id: 2, name: 'Maria', email: 'maria@example.com' }
//   ];

//   // Enviar los usuarios como respuesta en formato JSON
//   res.json(users);
// };

// module.exports = { getUsers };

///----------------------------consigana 5--------------------------------------
const Joi = require("joi");
const mongoose = require("mongoose");
const {
  getAllUsersController,
  getUserByIdController,
  getUserByNameController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userControllers");
const User = require("../models/User");

// Esquema de validación para los usuarios
// const userSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   username: Joi.string().min(3).required(), // Agregar la validación para el campo username
//   email: Joi.string().email().required(),
//   password: Joi.string().min(5).required(), // Validar la contraseña
//   role: Joi.string().valid("admin", "empleado", "cliente").default("cliente"), // Validar los roles permitidos
// });

//// para obtener usuarios todos /id / nombre ?

const getUsers = async (req, res) => {
  try {
    const { id, name } = req.query;

    // Buscar por ID
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "El ID proporcionado no es válido",
        });
      }
      const user = await getUserByIdController(id);
      if (!user) {
        return res.status(404).json({
          message: `Usuario con ID "${id}" no encontrado`,
        });
      }
      return res.status(200).json({
        message: "Usuario encontrado",
        user,
      });
    }

    // Buscar por nombre
    if (name) {
      const user = await getUserByNameController(name);
      if (!user) {
        return res.status(404).json({
          message: `Usuario con nombre "${name}" no encontrado`,
        });
      }
      return res.status(200).json({
        message: "Usuario encontrado",
        user,
      });
    }

    // Obtener todos los usuarios si no se especifica ID ni nombre
    const users = await getAllUsersController();
    return res.status(200).json({
      message: "Todos los usuarios obtenidos",
      users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      message: "Error interno al obtener usuarios",
      error: error.message,
    });
  }
};

// const getUsers = async (req, res) => {
//   try {
//     const users = await getAllUsersController(); // Llamada al controlador
//     // console.log("Usuarios recuperados:", users); // Depuración
//     res.json(users); // Enviar los usuarios al cliente
//   } catch (err) {
//     console.error("Error en getUsers:", err.message);
//     res.status(500).send("Ocurrió un error al obtener los usuarios.");
//   }
// };

// // Handler para obtener un usuario por ID
// const getUser = async (req, res) => {
//   try {
//     const userId = parseInt(req.query.id);
//     const user = await getUserByIdController(userId);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Ocurrió un error al obtener el usuario.");
//   }
// };

// Handler para agregar un nuevo usuario
const addUser = async (req, res) => {
  try {
    // Validar los datos recibidos en la solicitud
    const { error } = User.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message); // Error de validación
    }

    const { name, username, email, password, role } = req.body;
    const newUser = await createUserController({
      name,
      username,
      email,
      password,
      role,
    }); // Llamada al controlador

    console.log("Usuario creado con éxito:", newUser); // Mensaje en consola
    res
      .status(201)
      .json({ message: "Se creó un nuevo usuario con éxito", user: newUser }); // Mensaje en respuesta
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ocurrió un error al agregar el usuario.");
  }
};

// Handler para editar un usuario existente
// const editUser = async (req, res) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const { error } = userSchema.validate(req.body);

//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     const updatedUser = await updateUserController(userId, req.body);

//     if (updatedUser) {
//       res.json({ message: "Se modifico usuario con éxito", user: updatedUser });
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Ocurrió un error al editar el usuario.");
//   }
// };
//////de acuerdo a mongoose ////
const editUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verificar si el `id` es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID de usuario no válido" });
    }

    // // Validar los datos del body usando Joi
    // const { error } = userSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }


     // Validar los datos recibidos en la solicitud con mongogose
     const { error } = User.validate(req.body);

     if (error) {
       return res.status(400).send(error.details[0].message); // Error de validación
     }

    // Actualizar el usuario con el controlador
    const updatedUser = await updateUserController(userId, req.body);

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "Usuario modificado con éxito", user: updatedUser });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al editar usuario:", err.message);
    res.status(500).json({ message: "Ocurrió un error al editar el usuario." });
  }
};

// Handler para eliminar un usuario
const removeUser = (req, res) => {
  try {
    const userId = req.params.id;
    // const userId = parseInt(req.params.id);

    // Verificar si el `id` es un ObjectId válido  /////consigna 8
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID de usuario no válido" });
    }

    const deletedUser = deleteUserController(userId);
    if (deletedUser) {
      res.json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ocurrió un error al eliminar el Usuario.");
  }
};



module.exports = {
  getUsers,
  // getUser,
  addUser,
  editUser,
  removeUser,
};
