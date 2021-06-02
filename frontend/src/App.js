import React from 'react';
import data from './data';
import Product from './components/Product.js'

function App() {
  return (
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
      <div className="row center">
        {data.products.map((product) => (
          <Product key={product._id} product={product}></Product>
          ))}
      </div>
    </main>
    <footer className="row center">Todos os direitos reservados</footer>
  </div>
  );
}

export default App;