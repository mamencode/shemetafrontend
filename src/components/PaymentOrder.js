import React, { useEffect, useState } from "react";
import Axios from "../axios";

function PaymentOrder({ order }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await Axios.post("/payments/cart", order);
      setData(result.data);
      console.log(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [order]);
  return (
    <div>
      {data && (
        <a href={data.redirectUrl}>
          <button type="button" className="primary block">
            {" "}
            Pay Now ብር {order.totalPrice}{" "}
          </button>
        </a>
      )}
    </div>
  );
}

export default PaymentOrder;
