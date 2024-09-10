"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteCategory,
  getAllCategorys,
  updateCategory,
  createCategory,
} from "@/services/admin/manageCategory";
import { Categorys } from "@/interface/DataInter";
import CategoryForm from "@/components/admin/FormCategory";

export default function ManageCourses() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState<Categorys | null>(
    null
  );
  const [formValues, setFormValues] = useState({
    nameCategory: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategorys();
        setCategories(response);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await deleteCategory(id);
        const response = await getAllCategorys();
        setCategories(response);
      } catch (err: any) {
        setError(err);
      }
    }
  };

  const handleEditCategory = (category: Categorys) => {
    setEditingCategory(category);
    setFormValues({
      nameCategory: category.nameCategory,
      description: category.description,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;

    try {
      await updateCategory(editingCategory.id, formValues);
      const response = await getAllCategorys();
      setCategories(response);
      setEditingCategory(null);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err);
    }
  };

  const handleRowClick = (id: number, products: Categorys) => {
    router.push(`/admin/product/${products.nameCategory}/${id}`);
  };

  const handleAddNewCategory = () => {
    setIsEditMode(false);
    setFormValues({ nameCategory: "", description: "" });
    setIsModalOpen(true);
  };

  const handleSaveNewCategory = async () => {
    try {
      await createCategory(formValues);
      const response = await getAllCategorys();
      setCategories(response);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Danh Mục</h1>
      <button
        onClick={handleAddNewCategory}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Danh Mục
      </button>

      <CategoryForm
        formValues={formValues}
        setFormValues={setFormValues}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={isEditMode ? handleUpdateCategory : handleSaveNewCategory}
        isEditMode={isEditMode}
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tên Danh Mục</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any, index) => (
            <tr
              key={category.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(category.id, category)}
            >
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {category.nameCategory}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {category.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategory(category);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
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
}
