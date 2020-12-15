import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsOrder, payOrder, paymentOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import PaymentOrder from "../components/PaymentOrder";
import PaymentOrderTwo from "../components/PaymentOrderTwo";
import PayOrder from "../components/PayOrder";

function OrderScreen() {
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [dispatch, id]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.phoneNumber},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.ItemName}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.ItemName}
                          </Link>
                        </div>
                        <div>
                          {item.Quantity} x ብር  {""} {item.UnitPrice} = ብር {" "}
                          {""}
                          {item.Quantity * item.UnitPrice}
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
                  <div>ብር  {"" }  {order.itemsPrice}</div>
               </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>ብር  {"" }{order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>ብር  {"" }{order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>ብር  {"" }{order.totalPrice}</strong>
                  </div>
                </div>
              </li>
{!order.isPaid && (
<li>
<PaymentOrder order={order} />
</li>
)}
            </ul>
          </div>
        </div>
      </div>
      {/* <PaymentOrderTwo
        orderItems={order.orderItems}
        shippingPrice={order.shippingPrice}
        taxPrice={order.taxPrice}
        orderId={order._id}
        order={order}
      /> */}
    </div>
  );
}

export default OrderScreen;
