import './Setup.css';
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
    const allPaint = [];
    for(const paint in painting) {
    allPaint.push(painting[paint]);
    }
    console.log(allPaint);
    
  }

  return (
    <div className="App wrapper">
      <div className ="flex">
        <h1>store</h1>
      </div>
      <div className="flex-icon">
          <i className="fas fa-shopping-cart"></i>
       </div>
        <div className="flexContainer">
          <ul className= "paintingsGallery grid-container">
            {paintings.map((painting) => {
                return(
                  <li key={painting.key}>
                    <img src={painting.name.url} alt={painting.name.description}></img>
                    <p className="space">{painting.name.title}</p>
                    <p className="Pspace">{painting.name.description}</p>
                    <p className="Pspace price">{painting.name.price}</p>
                    <button  className="space" onClick={ () => {addToCart(painting)
                    }
                  }>Add to Cart</button>
                  </li>
                )
            })}
          </ul>
        </div>
        <div>

        </div>
    </div>
  );
}

export default App;

// testing

