import React, { useEffect } from "react";
import { Form, Input, Button, Modal, InputNumber, Upload, message } from "antd";
import { CameraFilled } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (product: ProductFormValues) => void;
  initialData?: ProductFormValues | null; // Optional initial data for editing
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: File; // Optional image property
}

const AddProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  closeModal,
  handleSave,
  initialData, // Optional initial data for editing
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = React.useState<any>(null);

  useEffect(() => {
    if (isOpen && initialData) {
      form.setFieldsValue(initialData); // Set initial values when editing
    } else {
      form.resetFields();
      setImageFile(null);
    }
  }, [isOpen, initialData, form]);

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      setImageFile(info.file.originFileObj as File);
    } else if (info.file.status === "error") {
      message.error("Failed to upload image");
    }
  };

  const onFinish = (values: ProductFormValues) => {
    const productData: ProductFormValues = { ...values, image: imageFile };
    handleSave(productData);
    form.resetFields();
    setImageFile(null);
    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      title={
        <h2 className="text-xl font-semibold">
          {initialData ? "Sửa sản phẩm" : "Thêm mới sản phẩm"}
        </h2>
      }
      onCancel={closeModal}
      footer={null}
      width={400}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* <div className="flex justify-center mb-4">
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
            accept="image/*"
          >
            {imageFile || initialData?.image ? (
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : initialData?.image
                }
                alt="Product"
                className="w-24 h-24 bg-gray-200 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <CameraFilled size={32} className="text-gray-400" />
              </div>
            )}
          </Upload>
        </div> */}
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input placeholder="Tên sản phẩm" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập đơn giá" }]}
        >
          <InputNumber placeholder="Đơn giá" className="w-full" />
        </Form.Item>
        <Form.Item
          name="stock"
          rules={[{ required: true, message: "Vui lòng nhập tồn kho" }]}
        >
          <InputNumber placeholder="Tồn kho" className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {initialData ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
