import React, { useState } from "react";

function Cadastro(){

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("foi")
        
    }

    return(
        <div>
            <form className="">
                <div>
                    <h1>CADASTRE-SE</h1>
                </div>
                <label>NOME</label>
                <input 
                type='text'
                value={nome}
                id='nome'
                name="nome"
                onChange={(e)=>{setNome(e.target.value)}}
                />
                <label>E-MAIL</label>
                <input 
                type='email'
                value={email}
                id='email'
                name="email"
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label>MATRÍCULA</label>
                <input 
                type='text'
                value={matricula}
                id='matricula'
                name="matricula"
                onChange={(e)=>{setMatricula(e.target.value)}}
                />
                <label>SENHA</label>
                <input 
                type='password'
                value={password}
                id='password'
                name='password'
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <label>CONFIRMAR SENHA</label>
                <input 
                type='password'
                value={confirmPassword}
                name='confirmPassword'
                id="confirmPassword"
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
                <div>
                    <button type="submit" onClick={onSubmit}>CADASTRAR</button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;