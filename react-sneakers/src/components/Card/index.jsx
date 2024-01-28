import styles from "./Card.module.scss";

export default function Card({ imageUrl, title, price, onClick }) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/unliked.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers"></img>
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button onClick={onClick} className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="plus" />
        </button>
      </div>
    </div>
  );
}
