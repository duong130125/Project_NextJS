"use client";
import { Form, Input, Button, Checkbox, notification, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Login() {
  return (
    <div className="gradient-custom flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto">
        <div className="hidden md:block md:w-1/3">
          <img
            src="https://img.lovepik.com/original_origin_pic/18/11/27/137f9dc94ac924466aa154bcbc13531e.jpg_wh860.jpg"
            alt="Canyon"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6 bg-white">
          <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
          <Form
            // form={form}
            name="login"
            // onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Địa chỉ email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Địa chỉ email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu không được quá ngắn!" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a
                className="float-right text-sm text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                Quên mật khẩu?
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                // loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-3">
            <span className="text-sm text-gray-600">hoặc</span>
          </div>
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/auth/register"
              className="text-purple-500 hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      <Modal
        title="Tài khoản bị khóa"
        // visible={isModalVisible}
        // onOk={() => setIsModalVisible(false)}
        // onCancel={() => setIsModalVisible(false)}
      >
        <p>
          Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để biết thêm chi
          tiết.
        </p>
      </Modal>
    </div>
  );
}
