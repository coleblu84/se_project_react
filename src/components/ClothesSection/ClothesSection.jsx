import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems = [], handleCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  // Show only items that belong to the current user
  const myItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__add-btn" type="button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {myItems.map((item) => (
          <ItemCard
            key={item._id || item.id}
            item={item}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
