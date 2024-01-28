import styles from "./Drawer.module.scss";

export default function Drawer() {
  return (
    <div style={{ display: "none" }} className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30">
          Корзина
          <img
            className={styles.removeBtn}
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        <div className={styles.items}>
          <div className={`${styles.cartItem} d-flex align-center`}>
            <div
              className={styles.cartItemImg}
              style={{
                backgroundImage: 'url("/img/sneakers/1.jpg")',
              }}
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className={styles.removeBtn}
              src="/img/btn-remove.svg"
              alt="remove"
            />
          </div>
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
          <button className={`${styles.greenButton} greenButton`}>
            Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
