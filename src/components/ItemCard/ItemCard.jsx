import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heart from "../../assets/heart.svg"; 
import heartLiked from "../../assets/heart-liked.svg"; 

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = currentUser
    ? item.likes?.some((id) => id === currentUser._id)
    : false;

  const handleLike = () => {
    if (currentUser && onCardLike) {
      onCardLike(item);
    }
  };

  return (
    <li className="card">
      <div className="card__image-container">
        <img
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
          onClick={handleCardClick}
        />
        {currentUser && (
          <button
            type="button"
            className="card__like-button"
            onClick={handleLike}
          >
            <img
              src={isLiked ? heartLiked : heart}
              alt={isLiked ? "Unlike item" : "Like item"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      <p className="card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
