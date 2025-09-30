import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems = [], handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Item</p>
        <button className="clothes-section__add-btn" type="button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={`item-card-${item._id}`}
            item={item}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
