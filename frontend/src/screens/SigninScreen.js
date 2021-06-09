import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
          <h1>Olá!</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
            Não tem uma conta? Clique <Link to={`/register?redirect=${redirect}`}>aqui</Link> para se registrar.
          </div>
        </div>
      </form>    
    </div>
  )
};
