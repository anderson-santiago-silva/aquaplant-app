import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SigninScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: signin action
  }
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Olá!</h1>
        </div>
        <div>
          <label htmlFor="email">Seu email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Digite seu email" 
            required
            onChange={ e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Sua senha</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Digite sua senha" 
            required
            onChange={ e => setPassword(e.target.value)}/>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Entrar
          </button>
        </div>
        <div>
          <label />
          <div>
            Não tem uma conta? Clique <Link to="/register">aqui</Link> para se registrar.
          </div>
        </div>
      </form>    
    </div>
  )
};
