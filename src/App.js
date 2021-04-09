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
        newState.push({
          key:key,
          name: returnedDatafromFirebase[key]
        })
      }

      setPaintings(newState);
    })
  }, [])

  const addToCart = function (painting) {
    console.log('clicked')
    console.log(painting);
 }

  return (
    <div className="App">
     <h1>store</h1>
      <i className="fas fa-shopping-cart"></i>
     <div className="flexContainer">
      <ul className= "paintingsGallery">
          {paintings.map((painting) => {
          // console.log(painting)
          return(
            <li key={painting.key}>
              <img src={painting.name.url} alt={painting.name.description}></img>
              <p>{painting.name.title}</p>
            <p>{painting.name.description}</p>
              <button onClick={ () => {
              addToCart(painting)}
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
