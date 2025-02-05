import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface ErrorModalProps {
  errorMessage: string;
  open: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, open, onClose }) => {
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg transform transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 mb-4">
          <AiOutlineExclamationCircle className="text-yellow-500 text-3xl" />
          <h3 className="text-xl font-semibold text-gray-800">Something went wrong</h3>
        </div>
        <p className="text-gray-700 text-sm mb-6">{errorMessage}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ErrorModal;