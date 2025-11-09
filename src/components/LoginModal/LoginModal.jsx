import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen, handleReset]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await onLogin(values);
      handleReset(); // Reset only after successful login
    } catch (err) {
      console.error("Login failed:", err);
      // Do not reset form if login fails
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Login"
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
    </ModalWithForm>
  );
};

export default LoginModal;
