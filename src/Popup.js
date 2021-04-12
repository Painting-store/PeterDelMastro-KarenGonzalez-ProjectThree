
 
const CheckOutPopup = function (props) {
       console.log(props)
        return (
            <div>
                <h2>Items in Your Cart:</h2>
                {/* {props.map(() => {
                    return (
                        <li key={props.key}>
                            <img src={props.name.url} alt={props.name.description}></img>
                            <p className="space">{props.name.title}</p>
                            <p className="Pspace price">{props.name.price}</p>
                        </li>
                    )
                })} */}
            </div>)

    }

export default CheckOutPopup;