import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveShippingAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"


function ShippingAddressScreen() {
    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const {shippingAddress} = cart;
  if(!userInfo) {
      history.push('/signin')
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch()
  const submitHandler = (e)=> {
      e.preventDefault();
      dispatch(
          saveShippingAddress({
            fullName, address, city, phoneNumber, country
          })
      )
      history.push('/payment')
  }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Phone Number</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
        </div>
    )
}

export default ShippingAddressScreen
