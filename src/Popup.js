//function to display the checkout box
const CheckOutPopup = function (props) {

    return (
        <div className="cartBox">
            <h2>Items in your Cart:</h2>
                {props.arrayOfPaintings.map((cartPaint) => {
                    return (
                        <>
                        { cartPaint.value === false ?
                        <li className="gridBox list">
                            <img className="cartImage" src={cartPaint.url} alt={cartPaint.description}></img>
                            <p className="Pspace price cartPrice">{cartPaint.price} <i onClick={ () => {props.remove(props.arrayOfPaintings, cartPaint)}} className="far fa-trash-alt"></i></p>
                        </li>
                        : null
                        }
                        </>
                    )
                })}
                <p className='total price'>Total: ${props.totalCost} CAN</p>
        </div>)
    }

export default CheckOutPopup;