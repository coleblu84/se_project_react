import "./ItemModal.css";
import closeBtn from "../../assets/closebtn.png";

function ItemModal({ activeModal, handleCloseClick, card, handleDeleteItem }) {
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
            <button
              type="button"
              className="modal__delete-btn"
              onClick={() => handleDeleteItem(card)}
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;




// import "./ItemModal.css";
// import closeBtn from "../../assets/closebtn.png";

// function ItemModal({ activeModal, handleCloseClick, card, handleDeleteItem }) {
//   return (
//     <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
//       <div className="modal__content modal__content_type_image">
//         <button
//           onClick={handleCloseClick}
//           type="button"
//           className="modal__close"
//         >
//           <img src={closeBtn} alt="close" />
//         </button>
//         <img src={card.imageUrl} alt={card.name} className="modal__image" />
//         <div className="modal__footer">
//           <h2 className="modal__caption">{card.name}</h2>
//           <button
//             type="button"
//             className="modal__delete-btn"
//             onClick={() => handleDeleteItem(card)}
//           >
//             Delete item
//           </button>
//           <p className="modal__weather">Weather: {card.weather}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemModal;
