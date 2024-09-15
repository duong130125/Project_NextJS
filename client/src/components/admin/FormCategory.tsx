import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Upload, message } from "antd";
import { CameraFilled } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";

interface CategoryFormProps {
  formValues: { nameCategory: string; description: string; image?: string };
  setFormValues: (values: {
    nameCategory: string;
    description: string;
    image?: string;
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
  const [imageFile, setImageFile] = useState<any>(formValues.image || null);

  useEffect(() => {
    setImageFile(formValues.image || null);
  }, [formValues.image]);

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj as File;
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
        setFormValues({ ...formValues, image: reader.result as string });
        message.success(`${info.file.name} file uploaded successfully`);
      };
      reader.readAsDataURL(file);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Modal
      title={isEditMode ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical">
        <div className="flex justify-center mb-4">
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("You can only upload image files!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            onChange={handleImageChange}
            accept="image/*"
          >
            {imageFile ? (
              <img
                src={imageFile}
                alt="Category"
                className="w-24 h-24 bg-gray-200 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                <CameraFilled className="text-gray-400 text-2xl" />
              </div>
            )}
          </Upload>
        </div>
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
