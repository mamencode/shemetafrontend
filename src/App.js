import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import CartScreen from "./screens/CartScreen";
import HeaderScreen from "./screens/HeaderScreen";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from "@material-ui/core/IconButton";
import HomeScreen from "./screens/HomeScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import OrderScreenTwo from "./screens/OrderScreenTwo";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderPayment from "./screens/OrderPayment";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import { signout } from "./actions/userActions";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import OrderEditScreen from "./screens/OrderEditScreen";
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <IconButton onClick={() => setSidebarIsOpen(true)} className="open-sidebar">
                <MenuIcon style={{color: "white", fontSize: "18px"}} />
              </IconButton>
            
            <Link className="brand" to="/">
            ሸመታ
            </Link>
          </div>
          <div>
            <Link to="/cart">

            <Badge badgeContent={cartItems.length} color="secondary">
<ShoppingCartIcon style={{fontSize: "20px"}}/>
              </Badge>
            
              {/* {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )} */}
              
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <CloseIcon/>
              </button>
            </li>
            <li>
              <Link onClick={() => setSidebarIsOpen(false)}> Shoes</Link>
              <Link onClick={() => setSidebarIsOpen(false)}>Shirts</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Switch>
            <AdminRoute
              path="/productList"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/order/:id/edit"
            component={OrderEditScreen}
          ></AdminRoute>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route
              path="/product/:id/edit"
              component={ProductEditScreen}
              exact
            ></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>

            <Route path="/" component={HomeScreen} />
          </Switch>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
