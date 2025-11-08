import { useContext } from "react";
import "./ItemModal.css";
import closeBtn from "../../assets/closebtn.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, handleCloseClick, card, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user is the owner of the item
  const isOwn = currentUser && card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={() => handleDeleteItem(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
