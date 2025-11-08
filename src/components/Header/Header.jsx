import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  handleLogout,
  isLoggedIn,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">WTWR</div>

      {isLoggedIn && currentUser ? (
        <nav className="header__nav">
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
    </header>
  );
}

export default Header;
