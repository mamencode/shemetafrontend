import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen(){
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const history = useHistory()
  const [paymentMethod, setPaymentMethod] = useState('YenePay');
if(!shippingAddress.address) {
history.push('/shipping')
}
const dispatch = useDispatch();
const submitHandler = (e)=> {
e.preventDefault();
dispatch(savePaymentMethod(paymentMethod));
history.push('/placeorder')
}
  return(
<div>
<CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="yenepay"
              value="YenePay"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="yenepay">YenePay</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="CBE-Birr"
              value="CBE-Birr"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="CBE-Birr">CBE-Birr</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="Amole"
              value="Amole"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="Amole">አሞሌ </label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>

  </div>
  )
}

export default PaymentMethodScreen