import React from "react";
import AppContext from "../../context";
import axios from "axios";

import Info from "../Info";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({ items, onRemove }) {
  const { cartItems, setCartOpened, setCartItems } =
    React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/orders", { items: cartItems });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("/cart" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа ;(");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30">
          Корзина
          <img
            onClick={() => setCartOpened(false)}
            className={styles.removeBtn}
            src="/img/btn-remove.svg"
            alt="close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className={styles.items}>
              {items.map((obj, index) => (
                <div
                  key={index + obj.title}
                  className={`${styles.cartItem} d-flex align-center`}
                >
                  <div
                    className={styles.cartItemImg}
                    style={{
                      backgroundImage: `url("${obj.imageUrl}")`,
                    }}
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removeBtn}
                    src="/img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={`${styles.orangeButton} orangeButton`}
              >
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} уже собирается к Вам!`
                : "Добавьте хотя бы одну кроссовку, чтобы сделать заказ.."
            }
          />
        )}
      </div>
    </div>
  );
}
