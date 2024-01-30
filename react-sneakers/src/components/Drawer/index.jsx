import styles from "./Drawer.module.scss";

export default function Drawer({ onClose, items, onRemove }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30">
          Корзина
          <img
            onClick={onClose}
            className={styles.removeBtn}
            src="/img/btn-remove.svg"
            alt="close"
          />
        </h2>

        {items.length > 0 ? (
          <div>
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
              <button className={`${styles.orangeButton} orangeButton`}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}
          >
            <img
              className="mb-20"
              width={120}
              height={120}
              src="/img/empty-cart.jpg"
              alt="cart-empty"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы один кроссовок, чтобы сделать заказ.
            </p>
            <button
              onClick={onClose}
              className={`${styles.orangeButton} orangeButton`}
            >
              <img src="/img/arrow.svg" alt="arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
