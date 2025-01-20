import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onHide, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === document.getElementById("modal-overlay")) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onHide]);

  if (!isVisible) return null;

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-form-darkgray text-black dark:text-white rounded shadow-lg max-w-md w-full transform transition-transform duration-500 ${
          show ? "scale-100 translate-y-0" : "scale-75 translate-y-10"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
