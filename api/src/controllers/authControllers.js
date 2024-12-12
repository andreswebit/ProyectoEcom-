//  ///////////////////////////CONSIGNA 6 ////////////
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { users } = require("../baseDatos"); // Importar la base de datos simulada

// // Controlador para registrarse
// const registerController = async (name, username, email, password, role) => {
//   // Verificar si el usuario ya existe
//   const userExists = users.some((user) => user.email === email);
//   if (userExists) {
//     throw new Error("Usuario ya registrado");
//   }

//   // Hashear la contraseña con un "salt" de 10 rondas
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Crear un nuevo usuario
//   const newUser = {
//     id: users.length + 1, // Asignar un id simple incrementando el tamaño de la base de datos
//     name,
//     username,
//     email,
//     password: hashedPassword,
//     role,
//   };

//   // Guardar el nuevo usuario en la base de datos simulada
//   users.push(newUser);
//   console.log("Usuario creado con éxito:", newUser);

//   return newUser;
// };

// // Controlador para iniciar sesión
// const loginController = async (email, password) => {
//   // Buscar al usuario por el correo electrónico
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     throw new Error("Usuario no encontrado");
//   }

//   // Verificar la contraseña ingresada con la almacenada (hasheada)
//   const isPasswordMatch = await bcrypt.compare(password, user.password);

//   if (!isPasswordMatch) {
//     throw new Error("Contraseña incorrecta");
//   }

//   // Crear un token JWT con el id y el rol del usuario
//   const token = jwt.sign(
//     { id: user.id, role: user.role },
//     "mi_clave_secreta", // Aquí va tu clave secreta
//     { expiresIn: "1h" }
//   );

//   return {
//     message: "Inicio de sesión exitoso",
//     token,
//     user,
//   };
// };

// module.exports = { registerController, loginController };


//////////////////////////consigna 8 conectado con mongoose ////////////////


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importar el modelo User

// Controlador para registrarse
const registerController = async (name, username, email, password, role) => {
  try {
    // Verificar si el usuario ya existe en la base de datos
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Usuario ya registrado");
    }

    // Hashear la contraseña con un "salt" de 10 rondas
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    console.log("Usuario creado con éxito:", newUser);
    return {
      message: "Usuario registrado con éxito",
      user: { name: newUser.name, email: newUser.email, role: newUser.role },
    };
  } catch (error) {
    throw new Error("Error al registrar el usuario: " + error.message);
  }
};

// Controlador para iniciar sesión
const loginController = async (email, password) => {
  try {
    // Buscar al usuario por el correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar la contraseña ingresada con la almacenada (hasheada)
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    // Crear un token JWT con el id y el rol del usuario
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mi_clave_secreta", // Aquí va tu clave secreta
      { expiresIn: "1h" }
    );

    return {
      message: "Inicio de sesión exitoso",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    };
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};

module.exports = { registerController, loginController };
