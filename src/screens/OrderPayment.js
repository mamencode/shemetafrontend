// import Axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import PayOrder from "../components/PayOrder";

// function OrderPayment() {
//   const { id } = useParams();
//   const [order, setOrder] = useState({});
//   const { orderItems, shippingPrice, taxPrice } = order;
//   const [data, setData] = useState({});
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;
//   useEffect(() => {
//     Axios.get(`http://localhost:3000/orders/${id}`, {
//       headers: { Authorization: `Bearer ${userInfo.token}` }
//     }).then((response) => {
//       setOrder(response.data);
//       console.log(response.data);
//     });
//   }, []);
//   return (
//     <div>
//       <h1>{order._id} </h1>
//       <ul>
//         {order.orderItems.map((item) => (
//           <li key={item.product}>
//             <div>
//               {item._id}
//               {item.name}
//               {item.price}
//               {item.quantity}
//             </div>
        
//         ))}
      
//       </ul>
      
//     </div>
//   );
// }

// export default OrderPayment;
