import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import {
  CreditCardOutlined,
  CustomerServiceOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-[#f5e7d3]">
      <Header />

      <main className="container mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src="/banner-placeholder.jpg"
            alt="Mừng khai trương - Thiên Yến khuyến mãi lớn - Nhiều quà tặng hấp dẫn!"
            className="w-full h-80 object-cover"
          />
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
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                    Yến hồng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                    Yến huyết
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#8B4513] hover:text-[#A0522D]">
                    Yến trắng
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-[#e6d5b8] rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">SẢN PHẨM TIÊU BIỂU</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <img
                      src={`/product-${item}.jpg`}
                      alt={`Yến sào ${item}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">
                        Yến tinh chế loại thượng hạng 100gr
                      </h3>
                      <p className="text-red-600">2,800,000 ₫</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="w-full md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4">
              SẢN PHẨM CỦA CHÚNG TÔI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <img
                    src={`/product-${item}.jpg`}
                    alt={`Yến sào ${item}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">
                      Yến tinh chế loại thượng hạng 100gr
                    </h3>
                    <p className="text-red-600 font-bold mt-2">3,500,000 ₫</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
                  src={`/news-${item}.jpg`}
                  alt={`Tin tức ${item}`}
                  className="w-full h-48 object-cover"
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
