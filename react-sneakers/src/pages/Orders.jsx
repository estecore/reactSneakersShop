import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Card from "../components/Card";

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        // const { data } = await axios.get("/cart");
        // setOrders(data.reduce((prev, obj) => [...prev, ...obj.item], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов.");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap justify-center">
        {orders > 0 ? (
          (isLoading ? [...Array(4)] : orders).map((item, index) => (
            <Card key={index} loading={isLoading} {...item} />
          ))
        ) : (
          <div className="empty_page d-flex flex-column align-center">
            <img src="img/sad_order.svg" alt="sad" />
            <h2>Заказов нет..</h2>
            <p className="opacity-6 text-center">
              Вы нищеброд? <br />
              Оформите хотя бы один заказ.
            </p>
            <Link to="/">
              <button className="orangeButton">
                <img src="/img/arrow.svg" alt="arrow" />
                Вернуться назад
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
