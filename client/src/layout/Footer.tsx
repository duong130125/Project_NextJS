// components/Footer.tsx
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#8B4513] text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">THIÊN YẾN NHA TRANG</h2>
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
  );
};

export default Footer;
