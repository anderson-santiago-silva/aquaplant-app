import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { 
    success: successUpdate, 
    error: errorUpdate, 
    loading: loadingUpdate, 
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(()=> {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    if (password !== confirmPassword) {
      alert('As senhas não correspondem')
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id, 
          name, 
          email, 
          password, 
        })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Perfil do usuário</h1>
        </div>
        {loading ? ( 
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && ( 
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Perfil atualizado com sucesso!
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                type="text" 
                placeholder="Digite seu nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="text" 
                placeholder="Digite seu email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input 
                id="password" 
                type="text" 
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <input 
                id="confirmPassword" 
                type="text" 
                placeholder="Digite novamente sua senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Atualizar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
