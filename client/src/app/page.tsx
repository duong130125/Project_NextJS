import {
  CreditCardOutlined,
  CustomerServiceOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import React from "react";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

export default function page() {
  return (
    <div className="min-h-screen bg-[#f5e7d3]">
      <header className="bg-[#6A0000] text-white p-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/logo-placeholder.png"
              alt="Thiên Yến Nha Trang"
              className="h-16"
            />
          </div>
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="hover:underline hover:text-yellow-300">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-yellow-300">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-yellow-300">
                  Cửa hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-yellow-300">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-yellow-300">
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center">
            <a
              href="#"
              className="bg-[#8B4513] px-4 py-2 rounded hover:bg-yellow-500 transition duration-300 flex items-center space-x-2"
            >
              <ShoppingCartOutlined className="h-5 w-5" />
              <span>Giỏ hàng</span>
            </a>
          </div>
        </div>
      </header>

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

      <footer className="bg-[#8B4513] text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                THIÊN YẾN NHA TRANG
              </h2>
              <ul className="space-y-2">
                <li>Tư vấn - Thiết kế - Xây dựng nhà nuôi chim Yến</li>
                <li>Cung cấp thiết bị cho nhà Yến</li>
                <li>Bảo trì nhà nuôi Yến</li>
                <li>Cung cấp tổ Yến Sào chất lượng cao</li>
                <li>Dịch vụ bất động sản nhà Yến</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">THÔNG TIN LIÊN HỆ</h2>
              <p>Công ty TNHH Tổ yến đảo Nha Trang</p>
              <p>118 Hà Thanh - Nha Trang</p>
              <p>Email: toyennhatrang@gmail.com</p>
              <p>Điện thoại: 02583 111 222</p>
              <p>Hotline: 0935 111 222</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">FANPAGE FACEBOOK</h2>
              <div className="flex space-x-6 mt-4">
                <a href="#" aria-label="Facebook">
                  <FaFacebookF className="text-2xl text-blue-400 hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
                </a>
                <a href="#" aria-label="Facebook Messenger">
                  <FaFacebookMessenger className="text-2xl text-fuchsia-600 hover:text-fuchsia-500 transition-colors duration-300 cursor-pointer" />
                </a>
                <a href="#" aria-label="YouTube">
                  <FaYoutubeSquare className="text-2xl text-red-500 hover:text-red-400 transition-colors duration-300 cursor-pointer" />
                </a>
                <a href="#" aria-label="Twitter">
                  <FaTwitterSquare className="text-2xl text-cyan-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>
              &copy; 2023 © Thiên Yến Nha Trang. Design by Thietkewechuyen.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
