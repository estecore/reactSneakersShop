import React from "react";
import AppContext from "../context";
import Card from "../components/Card";

export default function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap justify-center">
        {favorites.map((item, index) => (
          <Card
            key={index + item.title}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            favorited={true}
            onFavorite={onAddToFavorite}
          />
        ))}{" "}
      </div>
    </div>
  );
}
