"use client";

import { useState, useEffect } from "react";
import AddProductModal from "@/components/admin/Formproduct";
import { Products } from "@/interface/DataInter";
import {
  createProduct,
  deleteProduct,
  getAllProductsByCategory,
  updateProduct,
} from "@/services/admin/manageProduct";

const ManageProducts = (props: any) => {
  const { params } = props;
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Products | any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);

  useEffect(() => {
    fetchProductsByCategory(Number(params.id));
  }, [params, searchTerm, minPrice, maxPrice]);

  const fetchProductsByCategory = async (categoryId: number) => {
    try {
      const fetchedProducts = await getAllProductsByCategory(
        categoryId,
        searchTerm,
        minPrice,
        maxPrice
      );
      setProducts(fetchedProducts);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product: any) => {
    try {
      if (editProduct) {
        // Update product
        await updateProduct(editProduct.id, {
          ...product,
          categoryId: Number(params.id),
        });
      } else {
        // Add new product
        await createProduct({
          ...product,
          categoryId: Number(params.id),
        });
      }
      fetchProductsByCategory(Number(params.id));
      setIsModalOpen(false);
      setEditProduct(null); // Reset editing state
    } catch (err) {
      setError("Failed to add/update product");
    }
  };

  const handleEditProduct = (product: Products) => {
    setEditProduct(product); // Set product to edit
    setIsModalOpen(true); // Open modal with product data
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        fetchProductsByCategory(Number(params.id));
      } catch (err) {
        setError("Failed to delete product");
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Đã xảy ra lỗi: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Sản Phẩm</h1>

      <div className="flex items-center justify-end space-x-2 mb-4">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditProduct(null);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded justify-start"
        >
          Thêm Sản Phẩm
        </button>

        <input
          type="text"
          className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            setMinPrice(Number(min));
            setMaxPrice(Number(max));
          }}
        >
          <option value="0-Infinity">Tất cả giá</option>
          <option value="0-100000">Dưới 100,000</option>
          <option value="100000-500000">100,000 - 500,000</option>
          <option value="500000-1000000">500,000 - 1,000,000</option>
          <option value="1000000-Infinity">Trên 1,000,000</option>
        </select>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        handleSave={handleAddProduct}
        initialData={editProduct ? { ...editProduct } : null}
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tên Sản Phẩm</th>
            <th className="py-2 px-4 border-b">Ảnh Sản Phẩm</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Giá</th>
            <th className="py-2 px-4 border-b">Tồn Kho</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Products, index: number) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{product.name}</td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.price}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.stock}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
