import React from "react";

import Card from "../components/Card";

export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img
            src="https://estecore.github.io/reactSneakersShop/img/search.svg"
            alt="search"
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear"
              src="https://estecore.github.io/reactSneakersShop/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск.."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-center">{renderItems()}</div>
    </div>
  );
}
