import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

// {"id":0,
// "imageUrl":"/img/sneakers/1.jpg",
// "title":"Nike Blazer Mid Suede",
// "price":12999},
// {"id":1,
// "imageUrl":"/img/sneakers/2.jpg",
// "title":"Nike Air Max 270 Centurion",
// "price":15600},
// {"id":2,
// "imageUrl":"/img/sneakers/3.jpg",
// "title":"Puma X Aka Boku Future Rider",
// "price":8499},
// {"id":3,
// "imageUrl":"/img/sneakers/4.jpg",
// "title":"Nike Kyrie 7 Middle New",
// "price":8999},
// {"id":4,
// "imageUrl":"/img/sneakers/5.jpg",
// "title":"Nike LeBron XVIII Fox",
// "price":5344},
// {"id":5,
// "imageUrl":"/img/sneakers/6.jpg",
// "title":"Nike Blazer Mid Suede",
// "price":18900},
// {"id":6,
// "imageUrl":"/img/sneakers/7.jpg",
// "title":"Puma X Aka Boku Future Rider",
// "price":7800}

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch("/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });

    axios.get("/items").then((res) => {
      setItems(res.data);
    });
    axios.get("/cart").then((res) => {
      setCartItems(res.data);
    });
    // axios.get("/favorites").then((res) => {
    //   setFavorites(res.data);
    // });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };
  const onRemoveItem = (id) => {
    axios.delete(`/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        // axios.delete(`/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        // const [data] = await axios.post("/favorites", obj);
        // setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось что-то с фаворитами(");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
