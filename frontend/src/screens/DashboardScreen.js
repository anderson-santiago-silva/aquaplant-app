import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch])
  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users"> Usuários</i>
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart"> Pedidos</i>
                </span>
              </div>
              <div className="summary-body">{summary.orders[0]?summary.orders[0].numOrders:0}</div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money"> Vendas</i>
                </span>
              </div>
              <div className="summary-body">
                R$
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Vendas</h2>
              {
                summary.dailyOrders.length === 0 ? (
                  <MessageBox>Sem vendas</MessageBox>
                ) : (
                  <Chart width="100%"
                    height="400px"
                    chartType="AreaChart"
                    loader={<div>Carregando gráfico</div>}
                    data={[
                      ['Date', 'Sales'],
                      ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                    ]}
                  ></Chart>
                )}
            </div>
            <div>
              <h2>Categoria</h2>
              {
                summary.productCategories.length === 0 ? (
                  <MessageBox>Sem categoria</MessageBox>
                ) : (
                  <Chart width="100%"
                    height="400px"
                    chartType="PieChart"
                    loader={<div>Carregando gráfico</div>}
                    data={[
                      ['Category', 'Product'],
                      ...summary.productCategories.map((x) => [x._id, x.count]),
                    ]}
                  ></Chart>
                )}
            </div>
          </div>
          </>
        )}
    </div>
  );
}
