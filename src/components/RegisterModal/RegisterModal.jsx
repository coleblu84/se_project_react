import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen, handleReset]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await onRegister(values);
      handleReset();
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      onClose={onClose}
      activeModal={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Enter your email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Create a password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Your name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="register-avatar"
          placeholder="Link to your avatar"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
