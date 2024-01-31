import React from "react";
import AppContext from "../context";

import styles from "../components/Drawer/Drawer.module.scss";

export default function Info({ title, image, description }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div
      className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}
    >
      <img className="mb-20" width={120} src={image} alt="cart-empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        onClick={() => setCartOpened(false)}
        className={`${styles.orangeButton} orangeButton`}
      >
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
}
