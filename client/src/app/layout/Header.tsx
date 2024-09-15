import { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-lg hover:text-yellow-300">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/favorite" className="text-lg hover:text-yellow-300">
                Yêu thích
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex items-center cursor-pointer">
                <span className="text-white text-lg">{user.username}</span>
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full ml-2"
                />
              </div>
            </Dropdown>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  Đăng ký
                </button>
              </Link>
            </>
          )}
          <Link
            href="/cart"
            className="border-0 transition duration-300 flex items-center space-x-2"
          >
            <ShoppingCartOutlined className="text-3xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
