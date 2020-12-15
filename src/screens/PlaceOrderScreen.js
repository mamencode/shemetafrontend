import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createOrder } from "../actions/orderActions"
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function PlaceOrderScreen(){
  const cart = useSelector((state) => state.cart);
const history = useHistory()

if(!cart.paymentMethod) {
history.push('/payment')
}
const orderCreate = useSelector((state) => state.orderCreate);
const { loading, success, error, order } = orderCreate;
// const toPrice=(num)=> {
//   Number.parseFloat(num).toFixed(2);
  
// }
// let itemPrice = toPrice(cart.cartItems.reduce((a, c)=> a + c.qty * c.price, 0));
// let shippingPrice = toPrice(itemPrice >100? (0): (10))
// let taxPrice = toPrice(itemPrice * 0.15)
// let totalPrice = toPrice(itemPrice + shippingPrice + taxPrice);

cart.itemsPrice = (cart.cartItems.reduce((a, c)=> a + c.UnitPrice * c.Quantity, 0))
cart.shippingPrice = cart.itemsPrice >300 ? (0): (50);
cart.taxPrice = (0.15 * cart.itemsPrice);
cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
useEffect(()=> {
if (success) {
  history.push(`/order/${order._id}`)
  dispatch({type: ORDER_CREATE_RESET})
}
}, [dispatch, order, history, success])
  return(
    <div>
<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.ItemName}
                          </Link>
                        </div>

                        <div>
                          {item.Quantity} x ብር {item.UnitPrice} = ብር {item.Quantity * item.UnitPrice}
                        </div>
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
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>
         {cart.itemsPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>ብር {cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>ብር {cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>ብር {cart.totalPrice }</strong>
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
                  Place Order
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

export default PlaceOrderScreen