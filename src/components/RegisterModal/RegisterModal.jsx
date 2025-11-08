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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
    handleReset();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
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
          id="email"
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
          id="password"
          placeholder="Create a password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Your name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
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
