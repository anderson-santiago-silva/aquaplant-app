import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import AdminRoute from './components/AdminRoute';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductsCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import DashboardScreen from './screens/DashboardScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
   const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector(state => state.productCategoryList);
  const { 
    loading: loadingCategories, 
    error: errorCategories, 
    categories, 
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductsCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              aquaplant
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => <SearchBox history={history}></SearchBox>}
            ></Route>
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
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Perfil</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Histórico</Link>
                    </li>
                    <li>
                      <Link to="/signin" onClick={signoutHandler}>
                        Sair
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Entrar</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Produtos</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Pedidos</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Usuários</Link>
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </header>
        <aside className={sidebarIsOpen? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>DEPARTAMENTO</strong>
              <button 
                onClick={() => setSidebarIsOpen(false)} 
                className="close-sidebar" 
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
            categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <span>
                    {c +' >'} 
                  </span>
                </Link>
              </li>
            ))
          )}
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route> 
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route 
            path="/product/:id/edit" 
            component={ProductEditScreen} 
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating" component={SearchScreen} exact></Route>
          <PrivateRoute path="/profile"component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist"component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">Todos os direitos reservados</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;