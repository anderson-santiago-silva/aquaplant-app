import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';

export default function ProductScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  if (!product) {
    return <div> Produto não encontrado! </div>
  }
  return (
    <div>
      <Link to="/">Voltar</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li>
              Price : ${product.price}
            </li>
            <li>Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">Em estoque</span> 
                    ) : (
                      <span className="error">Indisponível</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Adicionar ao carrinho</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
