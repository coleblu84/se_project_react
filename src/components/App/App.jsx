import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  postItem,
  deleteItem,
  updateUserData,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, authorize, getUserData } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");

  const onAddItem = (inputValues, handleReset) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.link,
      weather: inputValues.weatherType,
    };

    postItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleReset();
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to add item:", error));
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id || card.id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter(
            (item) => item.id !== card.id && item._id !== card._id
          )
        );
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to delete item:", error));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => console.error("Registration failed:", err));
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        getUserData(data.token).then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          closeActiveModal();
        });
      })
      .catch((err) => console.error("Login failed:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUserData({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Failed to update profile:", err));
  };

  const handleCardLike = (card) => {
    if (!currentUser) return;

    const isLiked = card.likes?.some((id) => id === currentUser._id);

    const updatedCard = {
      ...card,
      likes: isLiked
        ? card.likes.filter((id) => id !== currentUser._id)
        : [...(card.likes || []), currentUser._id],
    };

    setClothingItems((cards) =>
      cards.map((item) => (item._id === card._id ? updatedCard : item))
    );

    const likeRequest = isLiked
      ? removeCardLike(card._id)
      : addCardLike(card._id);

    likeRequest.catch((err) => {
      console.error("Failed to update like:", err);

      setClothingItems((cards) =>
        cards.map((item) => (item._id === card._id ? card : item))
      );
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => console.error("Token check failed:", err));
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => console.error("Failed to fetch weather:", err));
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.error("Failed to load items:", err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onAddItem={onAddItem}
                      onEditProfileClick={handleEditProfileClick}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            currentUser={currentUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
