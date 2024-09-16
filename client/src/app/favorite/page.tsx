"use client";

import React, { useState, useEffect } from "react";
import { HeartFilled, DeleteOutlined } from "@ant-design/icons";
import { Card, List, Button, Typography, Spin, Alert, message } from "antd";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  getFavorite,
  deleteFavoriteProduct,
} from "@/services/user/userProduct";

const { Title, Text } = Typography;

const FavoriteProductsList = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const data = await getFavorite();
        setFavoriteProducts(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFavoriteProduct(id);
      setFavoriteProducts(
        favoriteProducts.filter((product: any) => product.id !== id)
      );
      message.success("Sản phẩm đã được xóa khỏi trang yêu thích");
    } catch (err: any) {
      message.error("Xóa sản phẩm khỏi yêu thích không thành công");
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: "24px" }}>
        <Title level={2}>Sản phẩm yêu thích</Title>
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" showIcon />}
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={favoriteProducts}
          renderItem={(product: any) => (
            <List.Item>
              <Card
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    type="text"
                    icon={<HeartFilled style={{ color: "#ff4d4f" }} />}
                  />,
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(product.id)}
                  />,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Text type="danger" strong>
                      {product.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Footer />
    </>
  );
};

export default FavoriteProductsList;
