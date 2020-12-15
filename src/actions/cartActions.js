import Axios from "../axios"

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from '../constants/cartConstants';

export const addToCart = (id, Quantity) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/products/${id}`);
  const {
    cart: { cartItems },
  } = getState();
  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        ItemName: data.ItemName,
        image: data.image,
        UnitPrice: data.UnitPrice,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        Quantity,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};