import React, { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import UserModal from "./UserModal";

/**
 * Propriedades do componente UserCard.
 */
interface UserCardProps {
  userId: string;
  fullName: string;
  email: string;
}

/**
 * Componente de cartão de usuário.
 * @param {UserCardProps} props - Propriedades do componente.
 */
const UserCard: React.FC<UserCardProps> = ({ userId, fullName, email }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div
        className="p-4 rounded shadow-sm bg-white dark:bg-form-darkgray text-black dark:text-white border-[1px] border-menu-border-light dark:border-menu-border-dark 
        flex flex-col transition-all duration-400 ease-in-out transform hover:scale-[1.02] cursor-pointer max-w-64 w-full max-h-24 h-full justify-between"
      >
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-base max-w-28 truncate text-card-title">
            {fullName}
          </h3>
          <div
            className="text-card-fullscreen transition-all duration-400 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleShowModal}
          >
            <BsArrowsFullscreen />
          </div>
        </div>
        <p className="text-sm text-card-subtitle">{email}</p>
      </div>
      <UserModal show={showModal} onHide={handleCloseModal} userId={userId} />
    </>
  );
};

export default UserCard;
