import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

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
        <Link to="/" className="header__logo">
          WTWR
        </Link>

        {isLoggedIn && currentUser ? (
          <nav className="header__nav">
            <Link to="/profile" className="header__link">
              Profile
            </Link>
            <button onClick={handleAddClick}>Add Item</button>
            <div className="header__user-info">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name[0].toUpperCase()}
                </div>
              )}
              <span className="header__username">{currentUser.name}</span>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        ) : (
          <nav className="header__nav">
            <button onClick={handleRegisterClick}>Sign Up</button>
            <button onClick={handleLoginClick}>Sign In</button>
          </nav>
        )}

        <ToggleSwitch
          currentTemperatureUnit={currentTemperatureUnit}
          handleToggleSwitchChange={handleToggleSwitchChange}
        />
      </div>
    </header>
  );
}

export default Header;
