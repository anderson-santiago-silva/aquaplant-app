import { 
  createStore, 
  compose, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
  orderCreatedReducer, 
  orderDeleteReducer, 
  orderDeliverReducer, 
  orderDetailsReducer, 
  orderListReducer, 
  orderMineListReducer, 
  orderPayReducer,
  orderSummaryReducer
} from './reducers/orderReducers';
import { 
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer, 
  productListReducer, 
  productReviewCreateReducer, 
  productUpdateReducer
} from './reducers/productReducers';
import { 
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer, 
  userSigninReducer, 
  userUpdateProfileReducer,
  userUpdateReducer
} from './reducers/userReducer';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
     ? JSON.parse(localStorage.getItem('cartItems')) 
     : [],
     shippingAddress: localStorage.getItem('shippingAddress')
     ? JSON.parse(localStorage.getItem('shippingAddress'))
     : {},
     paymentMethod: 'Paypal'
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin : userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreated: orderCreatedReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  orderSummary: orderSummaryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
);

export default store;