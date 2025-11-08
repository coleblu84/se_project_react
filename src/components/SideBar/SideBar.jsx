import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import placeholderAvatar from "../../assets/avatar.png";

function SideBar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarSrc = currentUser?.avatar || placeholderAvatar;
  const userName = currentUser?.name || "User";

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img className="sidebar__avatar" src={avatarSrc} alt="User avatar" />
        <p className="sidebar__username">{userName}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onEditProfileClick}
        >
          Edit Profile
        </button>
        <button
          className="sidebar__logout-btn"
          type="button"
          onClick={onLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
