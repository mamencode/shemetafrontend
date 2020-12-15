import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import CartItem from "../components/CartItem";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const Quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, Quantity));
    }
  }, [dispatch, id, Quantity]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <CartItem
              
                key={item.product}
                id={item.product}
                item={item}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                dispatch={dispatch}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.Quantity, 0)} items)
                : ብር  {""}
                {cartItems.reduce((a, c) => a + c.UnitPrice * c.Quantity, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
