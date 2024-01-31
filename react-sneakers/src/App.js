import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

/* {"id":0,
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
/ "price":7800}
*/

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // fetch("/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });

    async function fetchData() {
      try {
        // const [cartResponse, favoritesResponse, itemsResponse] =
        //   await Promise.all([
        //     axios.get("/cart"),
        //     axios.get("/favorites"),
        //     axios.get("/items"),
        //   ]);
        const cartResponse = await axios.get("/cart");
        // const favoritesResponse = await axios.get("/favorites");
        const itemsResponse = await axios.get("/items");

        setIsLoading(false);

        setCartItems(cartResponse.data);
        //   setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных..");
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(`/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post("/cart", obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Не удалось что-то с добавлением в корзину(");
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении товара из корзины..не удаляй, прошу..");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        // axios.delete(`/favorites/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer items={cartItems} onRemove={onRemoveItem} opened={cartOpened} />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
