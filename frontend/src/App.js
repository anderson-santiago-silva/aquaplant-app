import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-continer">
        <header className="row">
          <div>
            <a className="brand" href="/">
              aquaplant
            </a>
          </div>
          <div>
            <a href="/cart">Carrinho</a>
            <a href="/signin">Entrar</a>
          </div>
        </header>
        <main>
          <Route path="/cart/:id" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">Todos os direitos reservados</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;