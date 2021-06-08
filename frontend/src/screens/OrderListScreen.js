import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);
  const deleteHandler = (order) => {
    // TODO: delete handler
  };
  return (
    <div>
      <div>
        <h1>Pedidos</h1>
        {loading? <LoadingBox></LoadingBox>:
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
                  <td>{order.user.name}</td>
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
