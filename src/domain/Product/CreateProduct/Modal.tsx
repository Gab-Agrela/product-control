"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CiCirclePlus } from "react-icons/ci";
import CreateProductForm from "./Form";

const CreateProductModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CiCirclePlus size={32} onClick={showModal} />
      <Modal
        title="Create Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateProductForm handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default CreateProductModal;
