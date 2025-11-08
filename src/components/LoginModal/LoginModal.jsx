import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
    handleReset();
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Login"
      onClose={onClose}
      activeModal={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
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

      <label htmlFor="password" className="modal__label">
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
    </ModalWithForm>
  );
};

export default LoginModal;
