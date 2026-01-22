import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">
        Contactos
      </Link>

      <Link to="/add" className="btn btn-success">
        Agregar contacto
      </Link>
    </nav>
  );
};