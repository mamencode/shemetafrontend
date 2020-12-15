import React from "react"
import {Link} from "react-router-dom"
import {removeFromCart } from "../actions/cartActions"

function CartItem({item, addToCart, dispatch}) {
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  return(
    <ul>
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
          <Link to={`/product/${item.product}`}>{item.ItemName}</Link>
        </div>
        <div>
          <select
            value={item.Quantity}
            onChange={(e) =>
              dispatch(
                addToCart(item.product, Number(e.target.value))
              )
            }
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
        <div>ብር {""} {item.UnitPrice}</div>
        <div>
          <button
            type="button"
            onClick={()=> removeFromCartHandler(item.product)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
    </ul>
  )
}

export default CartItem