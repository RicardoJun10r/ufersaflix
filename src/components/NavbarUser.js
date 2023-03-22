import React, { Component } from 'react';
import logoImage from '../assets/LOGO.png';

class NavbarUser extends Component {
    render() {
        return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"><img src={logoImage} alt="" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">INICIO</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/filmes">FILMES</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/series">SÉRIES</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-primary" type="submit">Pesquisar</button>
                            </form>
                            <ul className="navbar-nav" style={{ height: "40px" }}>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Link
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li><a className="dropdown-item" href="/configUsuario">CONFIGURAÇÃO DE CONTA</a></li>
                                        <li><a className="dropdown-item" href='/login'>SAIR</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
}

export default NavbarUser;