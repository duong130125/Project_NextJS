"use client";

import React, { useState } from "react";
import { HeartFilled, DeleteOutlined } from "@ant-design/icons";
import { Card, List, Button, Typography } from "antd";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const { Title, Text } = Typography;

const FavoriteProductsList = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([
    {
      id: 1,
      name: "Áo thun",
      price: 200000,
      image: "/api/placeholder/150/150",
    },
    {
      id: 2,
      name: "Quần jeans",
      price: 500000,
      image: "/api/placeholder/150/150",
    },
    {
      id: 3,
      name: "Giày sneaker",
      price: 800000,
      image: "/api/placeholder/150/150",
    },
  ]);

  const removeFromFavorites = (id: any) => {
    setFavoriteProducts(
      favoriteProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <>
      <Header></Header>
      <div style={{ padding: "24px" }}>
        <Title level={2}>Sản phẩm yêu thích</Title>
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
          renderItem={(product) => (
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
                    onClick={() => removeFromFavorites(product.id)}
                  />,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Text type="danger" strong>
                      {product.price.toLocaleString("vi-VN")} đ
                    </Text>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Footer></Footer>
    </>
  );
};

export default FavoriteProductsList;
