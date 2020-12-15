import React, {useState} from "react"
import Axios from "axios"
import { useDispatch, useSelector } from "react-redux";

function OrderTrial() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [data, setData] = useState({})

  const order = {
    process: 'Cart',
    successUrl: 'https://70l8q.csb.app/orderhistory',
    merchantId: '0770',
    merchantOrderId: 'kajhk-kjh',
    expiresAfter: 24,
    items: [
      {
        itemId: 'sku-01',
        itemName: 'sample item',
        unitPrice: 2300,
        quantity: 1
      },
      {
        itemId: 'sku-02',
        itemName: 'sample item 2',
        unitPrice: 2300,
        quantity: 2
      }
    ],
    totalItemsDeliveryFee: 10,
    totalItemsTax1: 320
  }


  const url = "https://testapi.yenepay.com/api/urlgenerate/getcheckouturl/ "
  const fetchData = async () => {
    const result = await Axios.post(
      url, order
     
    );

    setData(result.data);
    console.log(result.data)
  };
return(
  <div>

  </div>
)
}

export default OrderTrial