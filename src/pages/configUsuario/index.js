import React from "react";
import { Container } from "react-bootstrap";
import NavbarUser from "../../components/NavbarUser";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";

function ConfigUsuario(){
    const [startDate, setStartDate] = useState(new Date());
    return(
        <div style={{
            backgroundColor:"#393939",
            color:"white",
            justifyItems:"center",
            alignItems:"center",
            
        }}>
            <NavbarUser/>
            <Container fluid>
                <br/>
                <h2>CONFIGURAÇÃO DE CONTA</h2>
                <br/>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>NOME</Form.Label>
                        <Form.Control type="nome" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>E-MAIL</Form.Label>
                        <Form.Control type="email" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupMatricula">
                        <Form.Label>MATRICULA</Form.Label>
                        <Form.Control type="matricula" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDataNascimento">
                        <Form.Label>DATA NASCIMENTO</Form.Label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Form.Group>
                    <Button variant="primary">MUDAR SENHA</Button>{' '}
                    <br/>
                    <br/>
                    <Button variant="primary">SALVAR</Button>{' '}
                </Form>
            </Container>
        </div>
    )
}

export default ConfigUsuario;