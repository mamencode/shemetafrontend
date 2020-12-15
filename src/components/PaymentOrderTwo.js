import React, { useEffect, useState } from "react";
import Axios from "axios";

function PaymentOrderTwo({ orderItems, shippingPrice, taxPrice, orderId }) {
  const [url, setUrl] = useState(
    "https://testapi.yenepay.com/api/urlgenerate/getcheckouturl/ "
  );
  const [name, setItemName] = useState();
  const [itemquantity, setQuantity] = useState();
  const [data, setData] = useState({});
  const [id, setItemId] = useState();
  const [price, setItemPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  console.log(orderItems)
  useEffect(() => {
    orderItems.map((item) => {
      setItemName(item.name);
      setQuantity(item.qty);
      setItemPrice(item.price);
      setItemId(item._id);
    });

const orderPrice = {price}*{itemquantity};
console.log(orderPrice)

    const orderList = {
      process: "Cart",
      successUrl: "https://70l8q.csb.app/orderhistory",
      merchantId: "0770",
      merchantOrderId: orderId,
      expiresAfter: 24,
      items: [
        {
          itemId: id,
          itemName: name,
          unitPrice: price,
          quantity: itemquantity
        },
        {
          itemId: id,
          itemName: name,
          unitPrice: price,
          quantity: itemquantity
        }
      ],
      totalItemsDeliveryFee: shippingPrice,
      totalItemsTax1: taxPrice
    };
    const fetchData = async () => {
      setIsLoading(true);
      const result = await Axios.post(url, orderList);
      setData(result.data);
      setIsLoading(false);

      console.log(result.data);
    };
    fetchData();
  }, [url, orderId, itemquantity, shippingPrice, id, taxPrice, name, price]);
  // setData({})

  //     const handleClickOpen = () => {
  //       setOpen(true);
  //     };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {data && (
        <a href={data.result}>
          <button onClick={() => setUrl(url)}>Pay Now</button>
        </a>
      )}
    </div>
  );
}

export default PaymentOrderTwo;
