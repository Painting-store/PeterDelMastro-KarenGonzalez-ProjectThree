import "./Setup.css";
import { database } from "./firebase.js"; // Adjust the import to your file
import { useEffect, useState, useRef } from "react";
import "./App.css";
import CheckOutPopup from "./Popup.js";
import imageSrc from "./images/p-paint.png";
import { ref, get, child } from "firebase/database";

function App() {
  const [paintings, setPaintings] = useState([]);
  const [allPaint, setallPaint] = useState([]);
  const [cartClick, setcartClick] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [navPage, setNavPage] = useState("home");

  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setcartClick(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCheckoutClick = () => {
    setcartClick(false);
    setNavPage("goodbye");
  };

  const handleReturnClick = () => {
    clearCart();
    setNavPage("home");
  };
  useEffect(() => {
    const usersRef = ref(database, "/");

    get(child(usersRef, `/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const newState = [];

          const returnedDatafromFirebase = snapshot.val();

          console.log(returnedDatafromFirebase);
          for (let key in returnedDatafromFirebase) {
            newState.push({
              key: key,
              name: returnedDatafromFirebase[key],
            });
          }
          setPaintings(newState);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCart = function (painting) {
    const newPaint = [...allPaint];
    const rawTotal = totalPrice?.toString().replace(/,/g, "");
    const oldTotal = parseFloat(rawTotal);
    const rawPrice = painting.name.price?.toString().replace(/,/g, "");
    const newPrice = parseFloat(rawPrice) || 0;
    painting.name.value = false;
    newPaint.push(painting.name);
    setallPaint(newPaint);
    const value = oldTotal + newPrice;
    setTotalPrice(value);
  };

  const removePainting = function (cartPainting, deletePaint) {
    const rawTotal = totalPrice?.toString().replace(/,/g, "");
    const oldTotal = parseFloat(rawTotal);
    const rawPrice = deletePaint.price?.toString().replace(/,/g, "");
    deletePaint.value = true;
    const newPrice = parseFloat(rawPrice) || 0;
    const deleteP = cartPainting.findIndex(
      (object) => object.title === deletePaint.title
    );
    const newArray = [...allPaint];
    newArray.splice(deleteP, 1);
    const value = oldTotal - newPrice;
    setTotalPrice(value);
    setallPaint(newArray);
  };

  const clearCart = () => {
    const cartPaintings = [...allPaint];
    for (const painting of cartPaintings) {
      console.log(painting);
      painting.value = true;
    }
    setallPaint([]);
    setTotalPrice(0);
  };

  const checkOut = function () {
    setcartClick(!cartClick);
  };
  if (navPage === "home") {
    return (
      <div className="App wrapper">
        {cartClick === true ? (
          <CheckOutPopup
            arrayOfPaintings={allPaint}
            totalCost={totalPrice}
            remove={removePainting}
            handleCheckoutClick={handleCheckoutClick}
          />
        ) : null}

        <div className="flex" ref={cartRef}>
          <h1>
            Del Mastro & Gonzalez Gallery{" "}
            <i
              className="fas fa-shopping-cart"
              id="cart"
              onClick={() => {
                checkOut(allPaint);
              }}
            ></i>
          </h1>
        </div>

        <blockquote>
          <i>
            "If you could say it in words, there would be no reason to paint."
            Edward Hopper
          </i>
        </blockquote>
        <div className="flexContainer">
          <ul className="paintingsGallery grid-container">
            {paintings
              .slice()
              .reverse()
              .map((painting) => {
                return (
                  <li key={painting.key}>
                    <img
                      src={painting.name.url}
                      alt={painting.name.description}
                    ></img>
                    <p className="space">{painting.name.title}</p>
                    <p className="space">{painting.name.artist}</p>
                    <p className="space">{painting.name.date}</p>
                    <p className="Pspace">{painting.name.description}</p>
                    <p className="price">${painting.name.price} CAN</p>
                    {painting.name.value === true ? (
                      <button
                        onClick={() => {
                          addToCart(painting);
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button className="space" disabled>
                        Added to Cart
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="peterSection flexBox">
          <div className="divStyle">
            <h3>Upcoming exhibition</h3>
            <img className="peterImg" src={imageSrc} alt={"peter paint"}></img>
          </div>
          <div>
            <h4>Peter Del Mastro</h4>
          </div>
        </div>
      </div>
    );
  } else if (navPage === "goodbye") {
    return (
      <div className="App wrapper">
        {cartClick === true ? (
          <CheckOutPopup
            arrayOfPaintings={allPaint}
            totalCost={totalPrice}
            remove={removePainting}
            handleCheckoutClick={handleCheckoutClick}
          />
        ) : null}

        <div className="flex">
          <h1>Del Mastro & Gonzalez Gallery </h1>
        </div>

        <blockquote>
          <i>Thank you for shopping at the gallery, enjoy your bargains!</i>
        </blockquote>

        <h1
          style={{
            textAlign: "center",
            cursor: "pointer",
            padding: "10px 20px",
            backgroundColor: "grey",
            color: "#ffffff",
            borderRadius: "8px",
            border: "none",
            fontSize: "24px",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "inline-block",
            margin: "20px auto",
          }}
          onClick={handleReturnClick}
        >
          Return
        </h1>

        <div className="flexContainer"></div>
        <div className="peterSection flexBox">
          <div className="divStyle">
            <h3>Upcoming exhibition</h3>
            <img className="peterImg" src={imageSrc} alt={"peter paint"}></img>
          </div>
          <div>
            <h4>Peter Del Mastro</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
