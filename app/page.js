import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function BoxBasic() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Box component="section" className="bg-white border-2 border-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Stock Management</h1>
        <p className="text-gray-600 text-center mb-8">Version 1.0</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/product" className="block">
            <div className="border-2 border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-all transform hover:scale-105">
              <div className="text-4xl mb-3">📦</div>
              <h2 className="text-xl font-bold text-gray-900">Products</h2>
              <p className="text-sm text-gray-600 mt-2">Manage inventory</p>
            </div>
          </Link>
          
          <Link href="/category" className="block">
            <div className="border-2 border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 hover:bg-purple-50 transition-all transform hover:scale-105">
              <div className="text-4xl mb-3">📂</div>
              <h2 className="text-xl font-bold text-gray-900">Category</h2>
              <p className="text-sm text-gray-600 mt-2">Organize items</p>
            </div>
          </Link>
          
          <Link href="/customer" className="block">
            <div className="border-2 border-green-400 bg-green-50 rounded-xl p-6 text-center hover:border-green-600 hover:bg-green-100 transition-all transform hover:scale-105 shadow-lg">
              <div className="text-4xl mb-3">👥</div>
              <h2 className="text-xl font-bold text-green-900">Customers</h2>
              <p className="text-sm text-green-700 mt-2 font-semibold">Manage members</p>
            </div>
          </Link>
        </div>
      </Box>
    </main>
  );
}
