"use client";

import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-yellow-500">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Liên hệ</h1>
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              CÔNG TY CỔ PHẦN CICI - THƯƠNG ĐÌNH YẾN
            </h2>
            <p className="mb-2">
              Địa chỉ: Số 2 Ngõ 29 Đặng Văn Ngữ, Phường Trung Tự, Quận Đống Đa,
              TP Hà Nội
            </p>
            <p className="mb-2">Điện thoại: 0326698778</p>
            <p className="mb-2">Email: Thuongdinhyen@Gmail.Com</p>
            <p className="mb-2">Website: http://thuongdinhyen.com/</p>
            <div className="mt-8">
              <img
                src="https://www.thestatesman.com/wp-content/uploads/2020/04/googl_ED.jpg"
                alt="Google Maps placeholder"
                className="w-full rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <form className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Gửi tin nhắn cho chúng tôi
              </h2>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-gray-700 border border-yellow-500 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-gray-700 border border-yellow-500 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">
                  Điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full bg-gray-700 border border-yellow-500 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full bg-gray-700 border border-yellow-500 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">
                  Nội dung *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full bg-gray-700 border border-yellow-500 rounded px-3 py-2 text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Gửi đi
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
