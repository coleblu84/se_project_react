import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";

const today = new Date();
const currentDate = today.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
});

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  handleLogout,
  isLoggedIn,
  weatherData,
  currentTemperatureUnit,
  handleToggleSwitchChange,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img src={logo} alt="WTWR Logo" className="header__logo-image" />
          </Link>
          <p className="header__date-and-location">
            {currentDate}, {weatherData?.city || "New York"}
          </p>
        </div>

        <div className="header__right">
          <ToggleSwitch
            currentTemperatureUnit={currentTemperatureUnit}
            handleToggleSwitchChange={handleToggleSwitchChange}
          />

          {!isLoggedIn ? (
            <nav className="header__nav">
              <button
                onClick={handleRegisterClick}
                className="header__auth-btn"
              >
                Sign Up
              </button>
              <button onClick={handleLoginClick} className="header__auth-btn">
                Log In
              </button>
            </nav>
          ) : (
            <nav className="header__nav">
              <button
                onClick={handleAddClick}
                className="header__add-cloths-btn"
              >
                Add Item
              </button>
              <div className="header__user-info">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || "User Avatar"}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {(currentUser?.name?.[0] || "?").toUpperCase()}
                  </div>
                )}
                <span className="header__username">
                  {currentUser?.name || "User"}
                </span>
              </div>
              <button onClick={handleLogout} className="header__auth-btn">
                Logout
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
