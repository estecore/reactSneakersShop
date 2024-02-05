import React from "react";
import AppContext from "../context";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap justify-center">
        {favorites > 1 ? (
          <div>
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
            ))}
          </div>
        ) : (
          <div className="empty_page d-flex flex-column align-center">
            <img
              src="https://estecore.github.io/reactSneakersShop/img/sad_favorites.svg"
              alt="sad"
            />
            <h2>Избранных нет..</h2>
            <p className="opacity-6">Вы ничего не избирали, а зря..</p>
            <Link to="">
              <button className="orangeButton">
                <img
                  src="https://estecore.github.io/reactSneakersShop/img/arrow.svg"
                  alt="arrow"
                />
                Вернуться назад
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
