import { Outlet, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <>
     <nav className="navbar navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand"> Contacts</Link>
      <Link to="/add" className="btn btn-success"> Add contact</Link>
      </nav>
      <Outlet/>
    </>
  );
};
