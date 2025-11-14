import closeBtn from "../../assets/closebtn.png";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  activeModal,
  onClose,
  onSubmit,
  buttonText,
  secondaryButtonText,
  secondaryButtonAction,
}) {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="close form" />
        </button>
        <h2 className="modal__title">{title}</h2>

        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondaryButtonText && secondaryButtonAction && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={secondaryButtonAction}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
