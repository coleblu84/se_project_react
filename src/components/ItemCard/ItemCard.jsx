import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Open the modal when the image is clicked
  const handleCardClick = () => {
    onCardClick(item);
  };

  // Determine if the current user has liked this item
  const isLiked = currentUser
    ? item.likes?.some((id) => id === currentUser._id)
    : false;

  // Call the onCardLike handler passed from App.jsx
  const handleLike = () => {
    if (currentUser && onCardLike) {
      onCardLike(item);
    }
  };

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card">
      <p className="card__name">{item.name}</p>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      {currentUser && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
        >
          ❤️
        </button>
      )}
    </li>
  );
}

export default ItemCard;
