
 
const CheckOutPopup = function (props) {
  
       console.log(props.arrayOfPaintings);
        return (
            <div>
                <h2>Items in Your Cart:</h2>

                {props.arrayOfPaintings.map((cartPaint) => {
                    console.log(cartPaint);
                    return (
                        <li key={cartPaint}>
                            <img  src={cartPaint.url} alt={cartPaint.description}></img>
                            <p className="Pspace price">{cartPaint.price}</p>
                        </li>
                    )
                })} 
            </div>)

    }

export default CheckOutPopup;