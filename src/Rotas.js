import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Atleta from "./components/Atleta";
import Treinador from "./components/Treinador";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from './components/Login';
import Registrar from "./components/Registrar";

const Rotas = () => {
    return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />}></Route>
        <Route path='registrar' element={<Registrar />}>
          <Route path=':acao' element={<Registrar />} />
        </Route>
        <Route path='atleta' element={<Atleta />}>
          <Route path=':acao' element={<Atleta />} />
          <Route path=':acao/:id' element={<Atleta />} />
        </Route>
        <Route path='treinador' element={<Treinador />}>
          <Route path=':acao' element={<Treinador />} />
          <Route path=':acao/:id' element={<Treinador />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>);
};

export default Rotas;
