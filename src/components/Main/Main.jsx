import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  // Filter items for the current user if logged in
  const itemsToShow = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : clothingItems;

  // Further filter by weather type
  const filteredItems = itemsToShow.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={`item-card-${item._id}`}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
