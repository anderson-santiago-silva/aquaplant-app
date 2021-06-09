import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET })
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Deseja mesmo remover este pedido?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div>
      <div>
        <h1>Pedidos</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? 
          <LoadingBox></LoadingBox>:
        error? <MessageBox variant="danger"></MessageBox>
        :
        (
          <table className="table">
            <thead>
              <tr>
                <th>PEDIDO</th>
                <th>USUÁRIO</th>
                <th>DATA</th>
                <th>TOTAL</th>
                <th>PAGAMENTO</th>
                <th>ENTREGUE</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>R$ {order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Não'}</td>
                  <td>
                    {order.isDelivered 
                      ? order.deliveredAt.substring(0, 10) 
                      : 'Não'}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Detalhe
                    </button>
                    <button 
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}  
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
