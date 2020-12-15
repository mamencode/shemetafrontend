import React from "react"
import { useSelector } from "react-redux";
const cart = useSelector((state) => state.cart);
const orderCreate = useSelector((state) => state.orderCreate);
const { loading, success, error, order } = orderCreate;
cart.itemPrice = (cart.cartItems.reduce((a, c)=> a + c.qty * c.price, 0))
cart.shippingPrice = cart.itemPrice >100 ? (0): (10);
cart.taxPrice = (0.15 * cart.itemPrice);
cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;
function TotalPrice(){
  return(
    <div>
<div>{cart.itemPrice}</div>
<div>{cart.shippingPrice}</div>
<div>{cart.taxPrice}</div>
<div>{cart.totalPrice}</div>
    </div>
  )
}

export default TotalPrice