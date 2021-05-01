import './Setup.css';
import firebase from './firebase';
import {useEffect,useState} from 'react'
import './App.css';
import CheckOutPopup from './Popup.js';
import imageSrc from './images/p-paint.png';

function App() {
    const [paintings, setPaintings] = useState([]);
    const [allPaint, setallPaint] = useState([]);
    const [cartClick, setcartClick] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
  
  //useEffect to fetch our data from the firebase
  useEffect(() => {
    const dataBaseRef = firebase.database().ref();
    dataBaseRef.on('value', response => {
      
    const newState = [];
    const returnedDatafromFirebase = response.val();

      for (let key in returnedDatafromFirebase) {
        newState.push({
          key:key,
          name: returnedDatafromFirebase[key]
        })
      }
      setPaintings(newState);
    })
  }, [])


  // function to add paintings to the cart and tally the total
  const addToCart = function (painting) {
    const newPaint = [...allPaint];
    const newTotal = totalPrice;
    painting.name.value = false;
    newPaint.push(painting.name);
    setallPaint(newPaint);
    setTotalPrice(newTotal + painting.name.price);
  }

  const removePainting = function (cartPainting, deletePaint) {
    const deleteP = cartPainting.findIndex((object) => object.title === deletePaint.title)
    const newArray = [...allPaint];
    newArray.splice(deleteP,1);
    setTotalPrice(totalPrice - deletePaint.price);
    setallPaint(newArray);
    console.log(totalPrice);
  }

  //function to toggle the checkout boolean
  const checkOut = function () {
    setcartClick(true);
    
    if (cartClick === true) {
      setcartClick(false);
    } 
  }

  return (
   <div className="App wrapper">
        {cartClick === true
          ? <CheckOutPopup arrayOfPaintings={allPaint}  totalCost={totalPrice} remove={removePainting}
          />
        : null}

        <div className="flex">
          <h1>Del Mastro & Gonzalez Gallery</h1>
        </div>

        <blockquote><i>"If you could say it in words, there would be no reason to paint." Edward Hopper</i></blockquote>
        <div className="flex-icon">
          <i className="fas fa-shopping-cart" id="cart"  onClick={() => { checkOut(allPaint) }}></i>
        </div>

        <div className="flexContainer">
          <ul className= "paintingsGallery grid-container">
            {paintings.map((painting) => {
                return(
                  <li key={painting.key}>
                    <img src={painting.name.url} alt={painting.name.description}></img>
                    <p className="space">{painting.name.title}</p>
                    <p className="Pspace">{painting.name.description}</p>
                    <p className="price">${painting.name.price} CAN</p>
                     {painting.name.value === true
                      ? <button onClick={ () => {addToCart(painting)
                      }
                    }>Buy now</button>
                        : <button  className="space" disabled>Added to Cart</button>
                    }
                  </li>
                )
            })}
          </ul>
        </div>
         <div className="peterSection flexBox">
                <div className="divStyle">
                  <h3>Upcoming exhibition</h3>
                  <img className="peterImg" src={imageSrc} alt={"peter paint"} ></img>
                </div>
                 <div>
                      <h4>Peter Del Mastro</h4>
                 </div>
         </div>
   </div>
  );
}

export default App;