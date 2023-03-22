import React, { useContext, useState } from "react";
import { 
  Route, 
  BrowserRouter, 
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home";
import Adm from "../pages/adm";
import Busca from "../pages/busca";
import ConfigUsuario from "../pages/configUsuario"
import Filmes from "../pages/filmes";
import Series from "../pages/series";
import Cadastro from "../pages/cadastro";
import AdicionarFilmes from "../pages/adicionarFilmes/index";
import { AuthContext, AuthProvider } from "../context/authContext";

const Rotas = () => {

  return (
    <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/cadastro" element={<Cadastro />} />
          </Routes>
    </BrowserRouter>
  )
}

export default Rotas;

