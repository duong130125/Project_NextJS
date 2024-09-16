"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Table, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Carts } from "@/interface/DataInter";
import { getAllCarts } from "@/services/user/userCart";
import { createOrder, deleteCart } from "@/services/user/userOrder";

const { Option } = Select;

const CheckoutForm = () => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showCardFields, setShowCardFields] = useState(false);
  const [cartItems, setCartItems] = useState<Carts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId)?.id || null);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchCartItems = async () => {
        try {
          const products = await getAllCarts();
          const filteredProducts = products.filter(
            (item: any) => item.userId === userId
          );
          setCartItems(filteredProducts);
        } catch (err) {
          setError("Không thể tải giỏ hàng");
        } finally {
          setLoading(false);
        }
      };
      fetchCartItems();
    }
  }, [userId]);

  const handlePaymentMethodChange = (value: any) => {
    setPaymentMethod(value);
    setShowCardFields(value === "card");
  };

  const handleFinish = async (values: any) => {
    const result = await Swal.fire({
      title: "Xác nhận đơn hàng",
      text: "Bạn có chắc chắn muốn đặt đơn hàng này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const totalAmount: any = cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        const orderData = {
          userId,
          priceAll: totalAmount,
          status: false,
          method: paymentMethod,
          userName: values.fullName,
          userAddress: values.address,
          userPhone: values.phoneNumber,
        };

        await createOrder(orderData);

        for (const item of cartItems) {
          await deleteCart(item.id);
        }

        message.success("Đơn hàng đã được xác nhận thành công!");
        router.push("/");
      } catch (err) {
        message.error("Đã xảy ra lỗi khi xác nhận đơn hàng!");
      }
    }
  };

  const totalAmount: any = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const columns = [
    { title: "Sản phẩm", dataIndex: "nameProduct", key: "nameProduct" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Giá", dataIndex: "price", key: "price" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Thanh Toán
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Thông tin mua hàng
                  </h2>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    className="space-y-6"
                  >
                    <Form.Item
                      label="Họ và tên"
                      name="fullName"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ và tên" },
                      ]}
                    >
                      <Input className="w-full rounded-md" />
                    </Form.Item>

                    <Form.Item
                      label="Số điện thoại"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      ]}
                    >
                      <Input type="tel" className="w-full rounded-md" />
                    </Form.Item>

                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ" },
                      ]}
                    >
                      <Input className="w-full rounded-md" />
                    </Form.Item>

                    <Form.Item
                      label="Phương thức thanh toán"
                      name="paymentMethod"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn phương thức thanh toán",
                        },
                      ]}
                    >
                      <Select
                        onChange={handlePaymentMethodChange}
                        className="w-full"
                      >
                        <Option value="cash">Thanh toán tiền mặt</Option>
                        <Option value="card">Thanh toán qua thẻ</Option>
                      </Select>
                    </Form.Item>

                    {showCardFields && (
                      <div className="space-y-6 mt-6">
                        <Form.Item
                          label="Số thẻ"
                          name="cardNumber"
                          rules={[
                            { required: true, message: "Vui lòng nhập số thẻ" },
                          ]}
                        >
                          <Input className="w-full rounded-md" />
                        </Form.Item>

                        <Form.Item
                          label="Chủ thẻ"
                          name="nameCard"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên chủ thẻ",
                            },
                          ]}
                        >
                          <Input className="w-full rounded-md" />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-4">
                          <Form.Item
                            label="Ngày hết hạn"
                            name="expiryDate"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập ngày hết hạn",
                              },
                            ]}
                          >
                            <Input
                              placeholder="MM/YY"
                              className="w-full rounded-md"
                            />
                          </Form.Item>

                          <Form.Item
                            label="CVV"
                            name="cvv"
                            rules={[
                              { required: true, message: "Vui lòng nhập CVV" },
                            ]}
                          >
                            <Input className="w-full rounded-md" />
                          </Form.Item>
                        </div>
                      </div>
                    )}

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Xác nhận thanh toán
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Đơn hàng của bạn
                  </h2>
                  <Table
                    dataSource={cartItems}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                  />
                  <div className="text-right mt-4">
                    <p className="text-lg font-semibold">
                      Tổng cộng:{" "}
                      {totalAmount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutForm;
