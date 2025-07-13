import Modal from "react-modal";
import type { User } from "../types/user";
import React from "react";

interface UserModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User | null;
}

Modal.setAppElement("#root");

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onRequestClose,
  user,
}) => {
  if (!user) return null;

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <button
          onClick={onRequestClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </Modal>
    </React.Fragment>
  );
};
