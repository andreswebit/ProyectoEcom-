// import React from "react";
// import { NavLink } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to="/" activeClassName="active">
//             Inicio
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/products" activeClassName="active">
//             Productos
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/users" activeClassName="active">
//             Usuarios
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/cart" activeClassName="active">
//             Carrito
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// ////////////////////// NavBar.JSX//////////////////////

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../App.css";

// const NavBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to="/" className="nav-link" activeClassName="active">
//             Inicio
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/products" className="nav-link" activeClassName="active">
//             Productos
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/users" className="nav-link" activeClassName="active">
//             Usuarios
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/cart" className="nav-link" activeClassName="active">
//             Carrito
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/form" className="nav-link" activeClassName="active">
//             Formulario Productos
//           </NavLink>
//           <li>
//           <NavLink to="/formuser" className="nav-link" activeClassName="active">
//             Formulario Usuarios
//           </NavLink>
//         </li>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

import React from "react"; 
import { NavLink } from "react-router-dom"; 
import "../App.css"; 

const NavBar = ({ userName }) => { 
    return ( 
        <nav> 
            <ul> 
                <li> 
                    <NavLink to="/" className="nav-link" activeClassName="active"> 
                        Inicio 
                    </NavLink> 
                </li> 
                <li> 
                    <NavLink to="/products" className="nav-link" activeClassName="active"> 
                        Productos 
                    </NavLink> 
                </li> 
                <li> 
                    <NavLink to="/users" className="nav-link" activeClassName="active"> 
                        Usuarios 
                    </NavLink> 
                </li> 
                <li> 
                    <NavLink to="/cart" className="nav-link" activeClassName="active"> 
                        Carrito 
                    </NavLink> 
                </li> 
                <li> 
                    <NavLink to="/form" className="nav-link" activeClassName="active"> 
                        Formulario Productos 
                    </NavLink> 
                </li> 
                <li> <NavLink to="/formuser" className="nav-link" activeClassName="active"> 
                        Formulario Usuarios 
                    </NavLink> 
                </li> 
                <li style={{ float: 'right' }}> 
                    {userName && <span>Usuario: {userName}</span>} 
                </li> 
            </ul> 
        </nav> 
    ); 
}; 

export default NavBar; 