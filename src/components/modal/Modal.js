import React from "react";
import ClientModal from "./clientModal";

function Modal({ isOpen, questionData, setModalOpen, category, modalType }) {
  return (
    <ClientModal
      isOpen={isOpen}
      setModalOpen={setModalOpen}
      questionData={questionData}
      category={category}
      modalType={modalType}
    />
  );
}

export default Modal;
