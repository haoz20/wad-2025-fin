"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 150,
      renderCell: (params) => {
        return new Date(params.row.dateOfBirth).toLocaleDateString();
      }
    },
    { field: 'memberNumber', headerName: 'Member Number', width: 150 },
    { field: 'interests', headerName: 'Interests', width: 250 },
    {
      field: 'Action', headerName: 'Action', width: 300,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <Link href={`/customer/${params.row._id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded transition w-20">
                View
              </button>
            </Link>
            <button 
              onClick={() => startEditMode(params.row)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-semibold py-2 px-4 rounded transition w-20"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteCustomer(params.row)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-4 rounded transition w-20"
            >
              Delete
            </button>
          </div>
        )
      }
    },
  ]

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log(process.env.NEXT_PUBLIC_API_URL)

  const [customerList, setCustomerList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCustomer() {
    const data = await fetch(`${API_BASE}/customer`);
    const c = await data.json();
    const c2 = c.map((customer) => {
      return {
        ...customer,
        id: customer._id
      }
    })
    setCustomerList(c2);
  }

  useEffect(() => {
    fetchCustomer();
  }, []);

  function handleCustomerFormSubmit(data) {
    if (editMode) {
      // Updating a customer
      fetch(`${API_BASE}/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        stopEditMode();
        fetchCustomer()
      });
      return
    }

    // Creating a new customer
    fetch(`${API_BASE}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchCustomer());

  }

  function startEditMode(customer) {
    // Format date for input field (YYYY-MM-DD)
    const formattedCustomer = {
      ...customer,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split('T')[0]
    };
    reset(formattedCustomer);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: '',
      dateOfBirth: '',
      memberNumber: '',
      interests: ''
    })
    setEditMode(false)
  }

  async function deleteCustomer(customer) {
    if (!confirm(`Are you sure to delete [${customer.name}]`)) return;

    const id = customer._id
    await fetch(`${API_BASE}/customer/${id}`, {
      method: "DELETE"
    })
    fetchCustomer()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
          <p className="text-gray-600">Manage customer information and membership details</p>
        </div>

        <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editMode ? '✏️ Edit Customer' : '➕ Add New Customer'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full p-3 transition"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  name="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full p-3 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Member Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="memberNumber"
                  type="number"
                  {...register("memberNumber", { required: true })}
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full p-3 transition"
                  placeholder="Enter member number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interests
                </label>
                <input
                  name="interests"
                  type="text"
                  placeholder="e.g., movies, football, gym, gaming"
                  {...register("interests")}
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full p-3 transition"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => stopEditMode()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg"
                  >
                    Update Customer
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg"
                >
                  Add Customer
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Customer List ({customerList.length})
            </h2>
            <div className="text-sm text-gray-600 bg-green-100 px-4 py-2 rounded-full font-semibold">
              Total Members: {customerList.length}
            </div>
          </div>
          
          <DataGrid
            rows={customerList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell:hover': {
                backgroundColor: '#f0fdf4',
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
