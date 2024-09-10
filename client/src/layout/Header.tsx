// components/Header.tsx
import {
  CreditCardOutlined,
  CustomerServiceOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#6A0000] text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/thiet-ke-logo-yen-uu-dam-removebg-preview.png?alt=media&token=c9fd85d3-cb26-48e1-9202-db6944af9fdc"
            alt=""
            className="h-20"
          />
        </div>
        <nav>
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link href="/" className="text-lg hover:text-yellow-300">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg hover:text-yellow-300">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg hover:text-yellow-300">
                Cửa hàng
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg hover:text-yellow-300">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="#" className="text-lg hover:text-yellow-300">
                Liên hệ
              </Link>
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
  );
};

export default Header;
