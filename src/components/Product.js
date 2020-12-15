import React from "react"
import { Link, useParams } from 'react-router-dom';
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
function Product({id, price, image, name, rating, numReviews}) {

  return(
    <div  className="card">
 <Link to={`/product/${id}`}>
        <img className="medium" src={image} alt={name} />
      </Link>
      <div className="card-body">
      <Link to={`/product/${id}`}>
          <h2>{name}</h2>
        </Link>
        <div >
        <Rating
                        name="read-only"
                        value={rating}
                        readOnly
                      />
{/* <Box component="fieldset" mb={3} borderColor="transparent">
                     
                      <Typography component="legend">
                        Reviews:{numReviews}{" "}
                      </Typography>
                    </Box> */}
  </div>
        <div className="row">

        <div className="price">ብር  {""} {price}</div>
          </div>
        </div>
      </div>
  )
}

export default Product