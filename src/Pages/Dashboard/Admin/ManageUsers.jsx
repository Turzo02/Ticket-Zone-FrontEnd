import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ManageUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const handleMakeAdmin = async (id) => {
    await axiosSecure.patch(`/users/${id}`, {
      role: "admin",
    });
    refetch();
  };
  const handleMakeVendor = async (id) => {
    await axiosSecure.patch(`/users/${id}`, {
      role: "vendor",
    });
    refetch();
  };
  const handleMakeFraud = async (id) => {
    await axiosSecure.patch(`/users/${id}`, {
      role: "fraud",
    });
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader />
      </div>
    );
  }
  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }

  return (
    <div>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 sm:text-4xl">
          User Management
        </h1>

        {/* --- Desktop/Tablet View (Table)  --- */}

        <div className="sm:block">
          <div className="shadow-xl rounded-xl border border-gray-300 bg-white overflow-hidden">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                  <th className="p-4">Fraud Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {/* Table Row */}
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-700">
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      {/* Role Badge Demo */}
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      {/* Action column */}
                      <div className="flex gap-3">
                        {/* Make Admin */}
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          disabled={user.role === "admin"}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-purple-500 text-white hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Admin
                        </button>

                        {/* Make Vendor */}
                        <button
                          onClick={() => handleMakeVendor(user._id)}
                          disabled={user.role === "vendor"}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-teal-500 text-white hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Vendor
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        {user.role === "vendor" ? (
                          <button
                            onClick={() => handleMakeFraud(user._id)}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-red-500 text-white hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            fraud
                          </button>
                        ) : (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                            ❌
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
