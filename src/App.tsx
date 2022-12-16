import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './componentes/estaticos/footer/Footer';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './componentes/temas/listaTema/ListaTema';
import ListaPostagem from './componentes/postagens/listaPostagem/ListaPostagem';
import CadastroTema from './componentes/temas/cadastroTema/CadastroTema';
import CadastroPost from './componentes/postagens/cadastroPost/CadastroPost';
import DeletarTema from './componentes/temas/deletarTema/DeletarTema';
import DeletarPostagem from './componentes/postagens/deletarPostagem/DeletarPostagem';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <Router>
          <Navbar />
          <Routes>

            <Route path='/home' element={<Home />} />

            <Route path='/' element={<Login />} />

            <Route path='/login' element={<Login />} />

            <Route path='/cadastrar' element={<CadastroUsuario />} />

            <Route path='/temas' element={<ListaTema />} />

            <Route path='/posts' element={<ListaPostagem />} />

            <Route path='/formularioTema' element={<CadastroTema />} />

            <Route path='/formularioTema/:id' element={<CadastroTema />} />

            <Route path='/formularioPostagem/' element={<CadastroPost />} />

            <Route path='/formularioPostagem/:id' element={<CadastroPost />} />

            <Route path='/deletarTema/:id' element={<DeletarTema />} />

            <Route path='/deletarPostagem/:id' element={<DeletarPostagem />} />



          </Routes>
          <Footer />

        </Router>
      </Provider>

    </>
  );
}

export default App;
