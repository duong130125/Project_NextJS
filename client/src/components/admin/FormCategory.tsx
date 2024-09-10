"use client";

import React from "react";
import { Form, Input, Button, Modal } from "antd";

interface CategoryFormProps {
  formValues: { nameCategory: string; description: string };
  setFormValues: (values: {
    nameCategory: string;
    description: string;
  }) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleSubmit: () => void;
  isEditMode: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  formValues,
  setFormValues,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  isEditMode,
}) => {
  return (
    <Modal
      title={isEditMode ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Tên danh mục" required>
          <Input
            value={formValues.nameCategory}
            onChange={(e) =>
              setFormValues({ ...formValues, nameCategory: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Mô tả" required>
          <Input.TextArea
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} className="w-full">
            {isEditMode ? "Cập Nhật" : "Thêm Mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
