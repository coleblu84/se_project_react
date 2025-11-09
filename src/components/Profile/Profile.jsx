import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  onAddClick,
  onEditProfileClick,
  onLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      </section>
      <section className="profile__clothing-item">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          onAddClick={onAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
