const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "empleado", "cliente"],
    default: "cliente",
  },
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si la contraseña no cambió, continuar
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
