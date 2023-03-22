import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

function Login() {

    const { authenticated, login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setSenha] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return(
        <div>
            <div className="title">
                <h1>UFERSA-FLIX</h1>
                <p>{String(authenticated)}</p>
            </div>
            <form className="form-login">
                <label>E-MAIL</label>
                <input 
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label>SENHA</label>
                <input 
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e)=>{setSenha(e.target.value)}}
                />
                <div className="buttons">
                    <button type="submit" onClick={handleSubmit}>ENTRAR</button>
                    <button type="submit"><Link to='/cadastro'>REGISTRAR</Link></button>
                </div>
            </form>
        </div>
    );
}

export default Login;