import React from "react";
import { Link } from "react-router-dom";

import AppContext from "../../context";
import styles from "./Header.module.scss";

export default function Header({ onClickCart }) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <header className={`${styles} d-flex justify-between align-center p-40`}>
      <Link to="">
        <div className="d-flex align-center">
          <img
            width={40}
            height={40}
            src="https://estecore.github.io/reactSneakersShop/img/logo.png"
            alt="logo"
          />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img
            width={18}
            height={18}
            src="https://estecore.github.io/reactSneakersShop/img/cart.svg"
            alt="cart"
          />
          <span>{totalPrice > 0 ? `${totalPrice} руб.` : ""}</span>
        </li>
        <li>
          <Link to="favorites">
            <img
              className="mr-20 cu-p"
              width={18}
              height={18}
              src="https://estecore.github.io/reactSneakersShop/img/heart.svg"
              alt="heart"
            />
          </Link>
        </li>
        <li>
          <Link to="orders">
            <img
              className="cu-p"
              width={18}
              height={18}
              src="https://estecore.github.io/reactSneakersShop/img/user.svg"
              alt="user"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}
