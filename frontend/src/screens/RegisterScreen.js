import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não conferem')
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Criar uma conta</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nome</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Digite seu nome" 
            required
            onChange={ e => setName(e.target.value)}/>
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
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Digite novamente sua senha" 
            required
            onChange={ e => setConfirmPassword(e.target.value)}/>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Registrar
          </button>
        </div>
        <div>
          <label />
          <div>
            Já tem uma conta? Clique <Link to={`/signin?redirect=${redirect}`}>aqui</Link> para acessá-la.
          </div>
        </div>
      </form>    
    </div>
  )
};
