import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { Check, X, AlertCircle, BadgeCheck } from "lucide-react";
import Swal from "sweetalert2";

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


  const handleRoleUpdate = async (id, newRole, actionName) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to change this user's role to ${newRole.toUpperCase()} (${actionName}).`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newRole === "fraud" ? "#d33" : "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, ${actionName.toLowerCase()}!`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}`, {
          role: newRole,
        });

        // Refetch data after a successful update
        refetch();

        Swal.fire(
          "Success!",
          `User role has been updated to ${newRole}.`,
          "success"
        );
      } catch (error) {
        console.error("Role update failed:", error);
        Swal.fire(
          "Error!",
          "Failed to update user role. Please try again.",
          "error"
        );
      }
    }
  };

  const handleMakeAdmin = (id) => {
    handleRoleUpdate(id, "admin", "Make Admin");
  };

  const handleMakeVendor = (id) => {
    handleRoleUpdate(id, "vendor", "Make Vendor");
  };

  const handleMakeFraud = (id) => {
    handleRoleUpdate(id, "fraud", "Mark as Fraud");
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
    // NOTE: Assuming 'users', 'handleMakeAdmin', 'handleMakeVendor', 'handleMakeFraud', 'X', 'AlertCircle', and 'BadgeCheck' are defined in the scope.

    <div>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-base-100 text-base-content">
        {/* Header */}
        <div className="text-center py-8 mb-8 md:py-8 bg-base-200 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
            Manage User Panel
          </h1>
        </div>

        {/* --- Desktop/Tablet View (sm:block) --- */}
        <div className="hidden sm:block">
          {/* Table Container - Responsive scroll for smaller tables */}
          <div className="shadow-xl border border-base-300 bg-base-200 overflow-x-auto rounded-xl">
            <table className="table w-full text-left">
              <thead className="bg-base-300 text-base-content uppercase text-sm">
                <tr>
                  <th className="p-4 min-w-[150px]">Name</th>
                  <th className="p-4 min-w-[200px]">Email</th>
                  <th className="p-4 text-center min-w-[100px]">Role</th>
                  <th className="p-4 text-center min-w-[220px]">Actions</th>
                  <th className="p-4 text-center min-w-[150px]">
                    Fraud Action
                  </th>
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
                    <td className="p-4 text-center">
                      <div className="relative inline-block rounded-full">
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
                        {/* Background gradient for the role badge */}
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
                    <td className="p-4 text-center">
                      <div className="flex gap-3 justify-center">
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
                    <td className="p-4 text-center">
                      {user.role === "admin" ? (
                        <span className="text-sm text-green-500 flex justify-center">
                          <X />
                        </span>
                      ) : (
                        <div className="flex justify-center">
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
                              <AlertCircle size={16} />
                              Fraud
                            </button>
                          ) : (
                            // Non-vendor/non-admin roles show a simple indicator icon (assuming this is the 'fraud' role indicator)
                            <span className="text-sm flex items-center gap-4 text-red-500">
                              <BadgeCheck />
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Mobile View (sm:hidden - Card Layout) --- */}
        <div className="sm:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-base-200 p-4 rounded-xl shadow-xl border border-base-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-bold text-base-content">
                  {user.name}
                </h2>

                {/* Role Badge */}
                <div className="relative inline-block rounded-full">
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
              </div>

              <p className="text-sm text-base-content/80 mb-4 truncate">
                <span className="font-semibold mr-1">Email:</span> {user.email}
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Make Admin */}
                <button
                  onClick={() => handleMakeAdmin(user._id)}
                  disabled={user.role === "admin"}
                  className={`
                btn btn-sm text-white border-none transition w-full
                ${
                  user.role === "admin"
                    ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-300 text-base-content/70"
                    : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-md shadow-violet-500/50"
                }
              `}
                >
                  Make Admin
                </button>

                {/* Make Vendor */}
                <button
                  onClick={() => handleMakeVendor(user._id)}
                  disabled={user.role === "vendor"}
                  className={`
                btn btn-sm text-white border-none transition w-full
                ${
                  user.role === "vendor"
                    ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-300 text-base-content/70"
                    : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md shadow-blue-500/50"
                }
              `}
                >
                  Make Vendor
                </button>
              </div>

              {/* Fraud Action */}
              <div className="pt-2 border-t border-base-300/50 flex justify-center">
                {user.role === "admin" ? (
                  <span className="text-sm text-green-500 flex items-center gap-1 font-medium">
                    <X size={18} /> Admin Access
                  </span>
                ) : user.role === "vendor" ? (
                  <button
                    onClick={() => handleMakeFraud(user._id)}
                    className="
                  btn btn-sm text-white border-none transition 
                  bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 
                  shadow-md shadow-red-500/50
                  flex items-center gap-1 w-full justify-center
                "
                  >
                    <AlertCircle size={16} />
                    Mark As Fraud
                  </button>
                ) : (
                  <span className="text-sm flex items-center gap-1 text-red-500 font-medium">
                    <BadgeCheck size={18} /> Fraud User
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
