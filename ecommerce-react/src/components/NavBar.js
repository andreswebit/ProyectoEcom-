import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" activeClassName="active">
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active">
            Usuarios
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
