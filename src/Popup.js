
//function to display the checkout box
const CheckOutPopup = function (props) {

        return (
            <div className="cartBox">
                <h2>Items in your Cart:</h2>
                {props.arrayOfPaintings.map((cartPaint) => {
                    
                    return (
                        <li key={cartPaint} className="gridBox list">
                            <img className="cartImage" src={cartPaint.url}></img>
                            <p className="Pspace price cartPrice">{cartPaint.price} </p>
                        </li>
                    )
                })}
                <p class='total price'>Total: ${props.totalCost} CAN</p>
            </div>)

    }

export default CheckOutPopup;