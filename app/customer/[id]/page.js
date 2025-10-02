'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CustomerDetail() {
  const params = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchCustomer();
    }
  }, [params.id]);

  const fetchCustomer = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${apiUrl}/customer/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Customer not found');
      }
      
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching customer:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading customer details...</p>
        </div>
      </main>
    );
  }

  if (error || !customer) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border-2 border-red-300 p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Customer Not Found</h2>
          <p className="text-red-600 mb-6">The customer you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/customer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            ← Back to Customer List
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/customer"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold transition"
          >
            <span className="mr-2">←</span> Back to Customer List
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-2xl border-2 border-green-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Customer Profile</h1>
            <p className="text-green-100">Detailed information about this customer</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200 shadow-md">
                <div className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                  <span className="mr-2">👤</span> Name
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {customer.name}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200 shadow-md">
                <div className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                  <span className="mr-2">🎫</span> Member Number
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {customer.memberNumber}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200 shadow-md">
                <div className="text-sm font-semibold text-purple-700 mb-2 flex items-center">
                  <span className="mr-2">🎂</span> Date of Birth
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {new Date(customer.dateOfBirth).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-200 shadow-md">
                <div className="text-sm font-semibold text-yellow-700 mb-2 flex items-center">
                  <span className="mr-2">🎯</span> Interests
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {customer.interests || <span className="text-gray-400 italic text-base">Not specified</span>}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gray-200 flex gap-4">
              <Link
                href="/customer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
              >
                ← Back to Customer List
              </Link>
              {/* <Link
                href="/customer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
              >
                Edit Customer
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
