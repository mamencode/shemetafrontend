import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [Quantity, setQuantity] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
const history = useHistory()
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
history.push(`/cart/${id}?Quantity=${Quantity}`);
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.ItemName}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.ItemName}</h1>
                </li>
                <li>
                  <li>Pirce : ብር  {""} {product.UnitPrice}</li>
                </li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                      />
                      <Typography component="legend">
                        Reviews:{product.numReviews}{" "}
                      </Typography>
                    </Box>
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">
                        ብር  {""}{product.UnitPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                          <select
                              value={Quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                            </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
