import firebase from './firebase';
import {useEffect,useState} from 'react'
import './App.css';

function App() {
  const [paintings, setPaintings] = useState([]);
  const cartArray = [];
  
  useEffect(() => {
    //this is our variable to hold our reference to our database
    const dataBaseRef = firebase.database().ref();

    dataBaseRef.on('value', response => {
      
      //this is our storage array for the returned data 
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



  const addToCart = function (painting) {
    //create an array to hold the objects

    cartArray.push(painting);


    console.log('clicked')
    console.log(cartArray);


 }

  return (
    <div className="App">
     <h1>store</h1>
      <i className="fas fa-shopping-cart"></i>
      <ul className= "paintingsGallery">
          {paintings.map((painting) => {
          // console.log(painting)
            return (
              <div class= "paintingCell">
                <li key={painting.key}>
                  <div class = "imageContainer">
                    <img src={painting.name.url} alt={painting.name.description}></img>
                    </div>
              <p>{painting.name.title}</p>
                  <p>{painting.name.description}</p>
                  <p>{painting.name.price}</p>
              <button onClick={ () => {
              addToCart(painting)}
              }>
              Add to Cart
            </button>
                </li>
                </div>
          )
        })}
        </ul>
      
    </div>
     
    

  );
}

export default App;
