import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


class BotoesNavegacao extends Comment{
    render(){
        return(
            <div>
                <Button variant="outline-primary"><Link to="/adm">Usuario</Link></Button>{' '}
                <Button variant="outline-primary"><Link to="/Catalogo">Catalogo</Link></Button>{' '}
                <Button variant="outline-primary"><Link to="/AdicionarFilmes">adicionarFilmes</Link></Button>{' '}
            </div>
        )
    }
}

export default BotoesNavegacao;