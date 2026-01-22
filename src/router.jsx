import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>404 - Página no encontrada</h1>}>
      <Route index element={<Home />} />
      <Route path="add" element={<AddContact />} />
      <Route path="edit/:id" element={<AddContact />} />
    </Route>
  )
);
