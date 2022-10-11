import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Navbar from "./Navbar";
import Settings from "./Settings";

export const router = (
  <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path="" element={<Login />}>
        Home
      </Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="settings" element={<Settings />}></Route>
    </Routes>
  </BrowserRouter>
);
