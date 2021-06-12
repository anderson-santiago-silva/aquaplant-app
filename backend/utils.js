import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token, 
      process.env.JWT_SECRET || 'somethingsecret', 
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Chave de acesso inválida' })
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'Não há chave de acesso' })
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();    
  } else {
    res.status(401).send({ message: 'Chave admin inválida' })
  }
};

export const mailgun = () => 
mg({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMIAN,
});

export const payOrderEmailTemplate = (order) => {
  return `<h1>Obrigado por comprar conosco</h1>
  <p>
  Olá ${order.user.name},</p>
  <p>Processamos seu pedido</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Produto</strong></td>
  <td><strong>Quantidade</strong></td>
  <td><strong align="right">Valor</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> R$ ${item.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Valor dos itens:</td>
  <td align="right"> R$${order.itemsPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
  </tr>
  <tr>
  <td colspan="2">Valor da entrega:</td>
  <td align="right"> R$ ${order.shippingPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Valor total:</strong></td>
  <td align="right"><strong> R$${order.totalPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Forma de pagamento:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};