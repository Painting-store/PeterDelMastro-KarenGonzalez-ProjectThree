import firebase from './firebase';
import {useEffect,useState} from 'react'
import './App.css';

function App() {
  const [paintings, setPaintings] = useState([]);
  
  useEffect(() => {
    //this is our variable to hold our reference to our database
    const dataBaseRef = firebase.database().ref();

    dataBaseRef.on('value', response => {
      
      //this is our storage array for the returned data 
      const newState = [];

      const returnedDatafromFirebase = response.val();

      for (let key in returnedDatafromFirebase) {

        newState.push(returnedDatafromFirebase[key]);

      }

      setPaintings(newState);
    })
  }, [])
      
  const addToCart = function (painting) {
const checkOutArray = ['']

    const fbData = firebase.database().ref();
    const selection = fbData
    checkOutArray.push(selection);

    console.log(checkOutArray)

 }

  return (
    <div className="App">
     <h1>store</h1>
      <i class="fas fa-shopping-cart"></i>
     <div class ="flexContainer">
      <ul class = "paintingsGallery">
          {paintings.map((painting) => {
          return(
            <li>
              <img src={painting.url}></img>
              <p>{painting.title}</p>
            <p>{painting.description}</p>
              <button onClick={
              addToCart()
              }>
              Add to Cart
            </button>
            </li>
          )
        })}
        </ul>
        </div>
    </div>
    


    
    

  );
}

export default App;
