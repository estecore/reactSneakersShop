import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

import styles from "./Card.module.scss";

export default function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, imageUrl, title, price });
  };
  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 150 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="144" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="174" rx="5" ry="5" width="100" height="15" />
          <rect x="112" y="211" rx="5" ry="5" width="32" height="32" />
          <rect x="0" y="216" rx="5" ry="5" width="70" height="22" />
          <rect x="0" y="0" rx="5" ry="5" width="150" height="130" />
        </ContentLoader>
      ) : (
        <>
          <div onClick={onClickFavorite} className={styles.favorite}>
            {onFavorite && (
              <img
                src={`${isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}`}
                alt="unliked"
              />
            )}
          </div>
          <img width="100%" height={135} src={imageUrl} alt="sneakers"></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
