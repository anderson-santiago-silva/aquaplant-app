import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [state, setState] = useState(shippingAddress.state);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, state, city, postalCode, country })
    );
    props.history.push('/payment');
    //TODO: dispatch save shipping address action
  }
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Dados para envio</h1>
        </div>
        <div>
          <label htmlFor="fullName">Nome Completo</label>
          <input 
            type="text"
            id="fullName"
            placeholder="Informe o nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Endereço</label>
          <input 
            type="text"
            id="address"
            placeholder="Informe seu endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state">Estado</label>
          <input 
            type="text"
            id="state"
            placeholder="Informe seu estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Cidade</label>
          <input 
            type="text"
            id="city"
            placeholder="Informe sua cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">CEP</label>
          <input 
            type="text"
            id="postalCode"
            placeholder="Informe seu cep"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Pais</label>
          <input 
            type="text"
            id="country"
            placeholder="Informe seu país"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label/>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}
