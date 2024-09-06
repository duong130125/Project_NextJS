export default function ManageCourses() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Khóa Thi</h1>
      <button
        // onClick={openModal}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tên Danh Mục</th>
            <th className="py-2 px-4 border-b">Hình Ảnh</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentCourses.map((course: Courses, index: number) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b text-center">
                {indexOfFirstCourse + index + 1}
              </td>
              <td
                className="py-2 px-4 border-b text-center"
                onClick={() => handleNext(course.id)}
              >
                {course.title}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded-50 w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                {course.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCourse(course);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCourse(course.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <nav className="inline-flex">
          {/* <button
            onClick={() => changePage("prev")}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } border border-gray-300`}
          >
            ‹
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => navigateToPage(page + 1)}
              className={`px-3 py-1 ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              } border-t border-b border-gray-300`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => changePage("next")}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } border border-gray-300`}
          >
            ›
          </button> */}
        </nav>
      </div>
    </div>
  );
}
