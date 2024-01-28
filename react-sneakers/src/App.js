import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
  {
    id: 0,
    imageUrl: "/img/sneakers/1.jpg",
    title: "Nike Blazer Mid Suede",
    price: 12999,
  },
  {
    id: 1,
    imageUrl: "/img/sneakers/2.jpg",
    title: "Nike Air Max 270",
    price: 15600,
  },
  {
    id: 2,
    imageUrl: "/img/sneakers/3.jpg",
    title: "Nike Blazer Mid Suede",
    price: 8499,
  },
  {
    id: 3,
    imageUrl: "/img/sneakers/4.jpg",
    title: "Puma X Aka Boku Future Rider",
    price: 8999,
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input placeholder="Поиск.." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card
              key={obj.id + obj.title}
              imageUrl={obj.imageUrl}
              title={obj.title}
              price={obj.price}
              onClick={() => alert("click")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
