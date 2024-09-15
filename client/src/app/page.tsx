"use client";

import { Categorys, Products } from "@/interface/DataInter";
import Footer from "@/app/layout/Footer";
import Header from "@/app/layout/Header";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
} from "@/services/user/userShop";
import {
  CreditCardOutlined,
  CustomerServiceOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import ProductsSection from "./ProductsSection";

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Categorys[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Lấy danh sách danh mục
        const categoriesData: any = await getAllCategories();
        setCategories(categoriesData);

        // Tìm danh mục có tên là "Yến hồng"
        const yenHongCategory = categoriesData.find(
          (cat: any) => cat.nameCategory === "Yến Hồng"
        );

        if (yenHongCategory) {
          // Nếu tìm thấy danh mục "Yến hồng", tự động chọn và lấy sản phẩm
          setSelectedCategory(yenHongCategory.id);

          const yenHongProducts = await getProductsByCategory(
            yenHongCategory.id
          );
          setProducts(yenHongProducts);
        } else {
          // Nếu không tìm thấy danh mục "Yến hồng", lấy toàn bộ sản phẩm
          const allProductsData: Products[] = await getAllProducts();
          setProducts(allProductsData);
        }

        // Lấy 5 sản phẩm đầu tiên làm sản phẩm nổi bật
        const allProductsData: Products[] = await getAllProducts();
        setFeaturedProducts(allProductsData.slice(0, 5));

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
        setError("Có lỗi khi tải dữ liệu ban đầu");
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setLoading(true);
      try {
        const data = await getProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setError("Có lỗi khi lấy sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    // Chỉ gọi fetchProducts khi selectedCategory thay đổi và không phải lần đầu tiên tải trang
    if (selectedCategory !== null) {
      fetchProducts();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleProductClick = (productId: number, product: Products) => {
    // Điều hướng đến trang chi tiết sản phẩm
    router.push(`/productDetail/${product.name}/${productId}`);
  };

  if (loading) {
    return <p className="text-center mt-8">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }
  return (
    <div className="min-h-screen bg-[#f5e7d3]">
      <Header />

      <main className="container mx-auto mt-8 px-4">
        <div className="rounded-lg shadow-lg overflow-hidden mb-8">
          <Slider {...sliderSettings}>
            {[1, 2, 3].map((item) => (
              <div key={item} className="px-2">
                <img
                  className="w-full h-[60vh] object-cover rounded-lg shadow-lg"
                  src="https://file.hstatic.net/200000404397/file/z4092993745728_54dfc62653706745c7f27e8e27bf88fb_f6e9cf8824764c55a474901efb057e39_master.jpg"
                  alt={`Slide ${item}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <ShoppingOutlined className="text-2xl text-red-600 mr-2" />
            <span>Giao hàng siêu tốc</span>
          </div>
          <div className="flex items-center">
            <CustomerServiceOutlined className="text-2xl text-red-600 mr-2" />
            <span>Tư vấn miễn phí</span>
          </div>
          <div className="flex items-center">
            <CreditCardOutlined className="text-2xl text-red-600 mr-2" />
            <span>Thanh toán khi nhận hàng</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="bg-[#e6d5b8] rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold mb-4">DANH MỤC SẢN PHẨM</h2>
              <ul className="space-y-4">
                {categories.map((category: any) => (
                  <li key={category.id} className="flex items-start space-x-4">
                    <img
                      src={category.imageUrl}
                      alt={category.nameCategory}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className={`text-[#8B4513] hover:text-[#A0522D] ${
                          selectedCategory === category.id ? "font-bold" : ""
                        }`}
                      >
                        {category.nameCategory}
                      </button>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#e6d5b8] rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">SẢN PHẨM TIÊU BIỂU</h2>
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-red-600">
                        {product.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <ProductsSection
            products={products}
            loading={loading}
            error={error}
            onProductClick={handleProductClick}
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">TIN TỨC MỚI CẬP NHẬT</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-[#e6d5b8] rounded-lg overflow-hidden"
              >
                <img
                  src="https://sokfarm-s3.s3.ap-southeast-1.amazonaws.com/wp-content/Y%E1%BA%BFn%20ch%C6%B0ng%20m%E1%BA%ADt%20hoa%20d%E1%BB%ABa%20t%C6%B0%C6%A1i/yen-sao-bo-duong.png"
                  className="w-full h-48 object-cover"
                  alt={`News ${item}`}
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    Những kinh nghiệm cần lưu ý khi mua Yến sào nguyên chất
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yến sào nguyên chất là sản phẩm quý giá...
                  </p>
                  <a
                    href="#"
                    className="text-[#8B4513] hover:text-[#A0522D] mt-2 inline-block"
                  >
                    Đọc tiếp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
