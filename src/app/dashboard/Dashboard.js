"use client";

import { generateTitle } from "@/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/admin/logout`
      );
      const result = await response.json();
      if (result.success) {
        toast.success(result.result);
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between background text-white">
      {/* Header */}
      <header className="bg-white text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-bold">
          Quiz Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category Cards */}
          {[
            "History",
            "Literature",
            "Geography",
            "Science and Technology",
            "Gaun Khane Katha",
            "Sports",
            "Religion and Culture",
            "Politics",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg text-gray-800 font-bold mb-2">
                {category}
              </h3>

              <Link
                className="mt-4 btn-primary text-white px-4 py-2 rounded "
                href={`/dashboard/${generateTitle(category)}`}
              >
                Manage
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-800 py-4 text-center">
        <p>&copy; 2024 Quiz App Admin. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
