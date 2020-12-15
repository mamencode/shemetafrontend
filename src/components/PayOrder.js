import React, { useEffect, useState } from "react"
import Axios from "axios"

function PayOrder({order}){
const [name, setItemName]= useState()
const [itemquantity, setQuantity]= useState()
const [data, setData]= useState({})
const [id, setItemId]= useState()
const [price, setItemPrice]= useState()

for(var i=0; i<order.orderItems.length; i++){
console.log(order.orderItems[i].price)
setItemName(order.orderItems[i].name)
setQuantity(order.orderItems[i].qty)
setItemPrice(order.orderItems[i].price)
setItemId(order.orderItems[i]._id)
}


useEffect(()=> {
// order.orderItems.map((item)=> {
// setItemName(item.name)
// setQuantity(item.qty)
// console.log(itemName, quantity)
// })
  const url = "https://testapi.yenepay.com/api/urlgenerate/getcheckouturl/ ";
const orderList = {
  process: "Cart",
  successUrl: "https://70l8q.csb.app/orderhistory",
  merchantId: "0770",
  merchantOrderId: order._id,
  expiresAfter: 24,
  totalItemsDeliveryFee:order.shippingPrice,
  totalItemsTax: order.taxPrice,
  items:[{
itemId: id,
itemName: name,
unitPrice: price,
quantity: itemquantity
  }]
}
const result = Axios.post(url, orderList)
setData(result.data)
},[order._id, itemquantity, order.shippingPrice, order.taxPrice, price, id, name])

return (
  <div>
    <h1>{order._id} </h1>  

{data && (
<a href={data.result}>
<button> PayNow</button>
</a>
)}

  </div>
  )
  }
  export default PayOrder

