import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');    
  }
  const orderCreated = useSelector((state) => state.orderCreated);
  const { loading, success, error, order } = orderCreated;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.totalPrice =cart.itemsPrice + cart.shippingPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createdOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Dados para envio</h2>
                <p>
                  <strong>Nome:</strong> {cart.shippingAddress.fullName} <br/>
                  <strong>Endereço:</strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.state}, {cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}                  
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Método:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Resumo</h2>
                <ul>
              {cart.cartItems.map((item) => (
                  <li className="row">
                    <div>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="small"
                      />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      {item.qty} x R$ {item.price.toLocaleString('pt-br', {minimumFractionDigits: 2})} = R$ {item.qty * item.price}
                    </div>
                  </li>
                ))}
            </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Resumo do pedido</h2>
              </li>
              <li>
                <div className="row">
                  <div>Itens</div>
                  <div>R$ {cart.itemsPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
                </div>
              </li>
              <li>
                <div className="row">
                <div>Entrega</div>
                  <div>R$ {cart.shippingPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total pedido</strong>
                  </div>
                  <div>
                    <strong>R$ {cart.totalPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Finalizar pedido
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
