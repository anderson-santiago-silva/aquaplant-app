import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
   const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-continer">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              aquaplant
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Carrinho
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdwon-content">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sair
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Entrar</Link>
              )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id" component={CartScreen}></Route> 
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">Todos os direitos reservados</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
