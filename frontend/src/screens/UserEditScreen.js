import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate 
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Editar usuário {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading? <LoadingBox/>:
        error? <MessageBox variant="danger">{error}</MessageBox>
        :
        <>
        <div>
          <label htmlFor="name">Nome</label>
          <input 
          type="text" 
          id="name" 
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          id="email" 
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="isAdmin">Admin</label>
          <input 
          type="checkbox" 
          id="isAdmin" 
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)} 
          />
        </div>
        <div>
          <button type="submit" className="primary">
            Atualizar
          </button>
        </div>
        </>
        }
      </form>
    </div>
  )
}

