import Modal from 'react-modal';
import type { User } from '../types/user';
import React from 'react';

// Interface for the UserModalProps
interface UserModalProps {
  // Boolean to determine if the modal is open
  isOpen: boolean;
  // Function to close the modal
  onRequestClose: () => void;
  user: User | null;
}

Modal.setAppElement('#root');

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onRequestClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 sm:mx-auto mt-20 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-open"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300"
      closeTimeoutMS={300}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{user.name}</h2>
      <div className="space-y-4 text-gray-700">
      <p className="flex items-center">
          <span className="font-medium w-24">Name:</span>
          <span>{user.name}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium w-24">Email:</span>
          <span>{user.email}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium w-24">Phone:</span>
          <span>{user.phone}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium w-24">Company:</span>
          <span>{user.company.name}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium w-24">Role:</span>
          <span className="capitalize">{user.role}</span>
        </p>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={onRequestClose}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};