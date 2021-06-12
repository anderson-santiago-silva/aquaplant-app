import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin); 
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate); 
  const { 
    loading: loadingReviewCreate, 
    error: errorReviewCreate, 
    success: successReviewCreate 
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Avaliação enviada com sucesso');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId))
  }, [dispatch, productId, successReviewCreate])
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`)
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Por favor, avalie o produto e deixe seu comentário')
    }
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
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
                Valor : R$ {product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}
              </li>
              <li>Descrição:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Valor</div>
                    <div className="price">R$ {product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">Em estoque</span> 
                      ) : (
                        <span className="danger">Indisponível</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                  <li>
                    <div className="row">
                      <div>Qtd</div>
                      <div>
                        <select className="bimbo"
                          value={qty} 
                          onChange={e => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>
                  </li>
                    <li>
                      <button 
                        onClick={addToCartHandler} 
                        className="primary block"
                        >
                          Adicionar ao carrinho
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 id="reviews">Avaliações</h2>
          {product.reviews.length === 0 && (
            <MessageBox>Não há comentários para este produto.</MessageBox>
          )}
          <ul>
            {product.reviews.map((review) => (
              <li key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" "></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </li>
            ))}
            <li>
              {userInfo ? (
                <form className="form" onSubmit={submitHandler}>
                  <div>
                    <h2>Deixe um comentário sobre este produto</h2>
                  </div>
                  <div>
                    <label htmlFor="rating">Avaliação</label>
                    <select 
                      id="rating" 
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="1">1- ruim</option>
                        <option value="2">2- Mais ou menos</option>
                        <option value="3">3- Bom</option>
                        <option value="4">4- Muito bom</option>
                        <option value="5">5- Excelente</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Comentário</label>
                    <textarea 
                      d="comment" 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label />
                    <button className="primary" type="submit">Enviar</button>
                  </div>
                  <div>
                  {loadingReviewCreate && <LoadingBox></LoadingBox>}
                  {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                  </div>
                </form>
              ) : (
                <MessageBox>
                  Por favor, <Link to="/signin">acesse</Link> sua conta para deixar um comentário.
                </MessageBox>
              )}
            </li>
          </ul>
        </div>
      </div>
      )}
    </div>
  );
}
