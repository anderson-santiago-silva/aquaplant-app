import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product (props) {
  const { product } = props;
  return (
    <div key="product._id" className="card-box">
      <Link to={`/product/${product._id}`}>
        <img 
          className="medium" 
          src={product.image} 
          alt={product.name} 
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <span>
            <h2>{product.name}</h2>
          </span>
        </Link>
          <Rating 
            rating={product.rating} 
            numReviews={product.numReviews}
          ></Rating>
        <div className="price-box">R$ {product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
      </div>
    </div>
  );
};