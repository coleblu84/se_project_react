import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin, onRegisterClick }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  const isFormValid = values.email.trim() && values.password.trim();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!isFormValid) return;
    try {
      await onLogin(values);
      handleReset();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      activeModal={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Enter your email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Enter your password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>

      <div className="modal__actions">
        <button type="submit" className="modal__submit" disabled={!isFormValid}>
          Log In
        </button>
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onRegisterClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
