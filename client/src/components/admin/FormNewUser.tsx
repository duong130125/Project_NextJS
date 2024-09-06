import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const NewUserForm = ({
  setModalVisible,
  onUserAdded,
}: {
  setModalVisible: (visible: boolean) => void;
  onUserAdded: (newUser: any) => Promise<void>;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (values: any) => {
    setLoading(true);
    try {
      const newUser = {
        username: values.username,
        email: values.email,
        avatar:
          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
        role: 0,
        status: true,
        password: values.password,
      };

      await onUserAdded(newUser);
      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: "Thêm mới thất bại",
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Thêm mới người dùng
        </h2>
        <Form
          form={form}
          name="newUser"
          onFinish={handleAddUser}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nhập họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Nhập địa chỉ email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Thêm mới
              </Button>
              <Button
                onClick={() => setModalVisible(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewUserForm;
