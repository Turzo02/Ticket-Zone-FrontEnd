import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { Check, X, AlertCircle, BadgeCheck } from "lucide-react";

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
      <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-base-100 text-base-content">
        <h1 className="text-3xl font-bold text-center text-primary mb-8 sm:text-4xl">
          User Management
        </h1>

        {/* --- Desktop/Tablet View --- */}
        <div className="sm:block">
          {/* Table Container */}
          <div className="shadow-xl rborder border-base-300 bg-base-200 overflow-hidden">
            {/* Using DaisyUI's `table` class for basic styling */}
            <table className="table w-full text-left">
              <thead className="bg-base-300 text-base-content uppercase text-sm">
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
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-base-300 last:border-b-0 hover:bg-base-300/50 transition"
                  >
                    <td className="p-4 font-medium text-base-content">
                      {user.name}
                    </td>
                    <td className="p-4 text-base-content/80">{user.email}</td>

                    {/* Role Badge */}
                    <td className="p-4 justify-center">
                      <div className="relative inline-block  rounded-full">
                        <span
                          className={`
      block text-xs px-3 py-1.5 font-semibold uppercase rounded-sm
      text-base-content bg-base-100/90 shadow-md
      
      ${
        user.role === "admin"
          ? "bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-fuchsia-600"
          : "bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-500"
      }
    `}
                        >
                          {user.role}
                        </span>
                        <div
                          className={`
      absolute inset-0 rounded-full z-[-1]
      ${
        user.role === "admin"
          ? "bg-linear-to-r from-violet-600 to-fuchsia-600"
          : "bg-linear-to-r from-blue-500 to-cyan-500"
      }
    `}
                        ></div>
                      </div>
                    </td>

                    {/* Action column (Make Admin/Vendor) */}
                    <td className="p-4">
                      <div className="flex gap-3">
                        {/* Make Admin */}
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          disabled={user.role === "admin"}
                          className={`
    btn btn-sm text-white border-none transition
    ${
      user.role === "admin"
        ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-300 text-base-content/70"
        : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-md shadow-violet-500/50"
    }
  `}
                        >
                          Admin
                        </button>

                        {/* Make Vendor */}
                        <button
                          onClick={() => handleMakeVendor(user._id)}
                          disabled={user.role === "vendor"}
                          className={`
    btn btn-sm text-white border-none transition
    ${
      user.role === "vendor"
        ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-300 text-base-content/70"
        : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md shadow-blue-500/50"
    }
  `}
                        >
                          Vendor
                        </button>
                      </div>
                    </td>

                    {/* Fraud Action column */}
                    <td className="p-4">
                      {user.role === "admin" ? (
                        <span className="text-sm text-base-content/50">
                          <X />
                        </span>
                      ) :     <div className="flex justify-center">
                        {user.role === "vendor" ? (
                          <button
                            onClick={() => handleMakeFraud(user._id)}
                            className="
    btn btn-sm text-white border-none transition 
    bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 
    shadow-md shadow-red-500/50
    flex items-center gap-1
  "
                          >
                            {/* Replaced 'fraud' text with icon */}
                            <AlertCircle size={16} />
                            Mark As Fraud
                          </button>
                        ) : (
                          // Non-vendor roles show a simple indicator icon
                          <span className="text-sm text-base-content/50 hover:text-success">
                            <BadgeCheck /> marked as fraud
                          </span>
                        )}
                      </div>

                      }
                 
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
