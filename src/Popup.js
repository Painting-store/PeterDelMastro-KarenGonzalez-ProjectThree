
 
const CheckOutPopup = function (props) {
  
       console.log(props.arrayOfPaintings);
        return (
            <div className="cartBox">
                <h2>Items in Your Cart:</h2>
                {props.arrayOfPaintings.map((cartPaint) => {
                    console.log(cartPaint);
                    return (
                        <li key={cartPaint} className="gridBox list">
                            <img className="cartImage" src={cartPaint.url}></img>
                            <p className="Pspace price cartPrice">{cartPaint.price}</p>
                        </li>
                    )
                })} 
            </div>)

    }

export default CheckOutPopup;