import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { Check, X, AlertCircle, BadgeCheck } from "lucide-react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

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

  const handleRoleUpdate = async (userToUpdate, newRole, actionName) => {
    const { _id: id, email: targetEmail } = userToUpdate;
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to change ${targetEmail}'s role to ${newRole.toUpperCase()} (${actionName}).`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
          `User role for ${targetEmail} has been updated to ${newRole}.`,
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

  const handleMakeAdmin = (userToAdmin) => {
    handleRoleUpdate(userToAdmin, "admin", "Make Admin");
  };

  const handleMakeVendor = (userToVendor) => {
    handleRoleUpdate(userToVendor, "vendor", "Make Vendor");
  };

  const handleMakeFraud = async (userToFraud) => {
    const { _id: id, email: vendorEmail } = userToFraud;

    const result = await Swal.fire({
      title: `Mark ${vendorEmail} as Fraud?`,
      text: `You are about to mark this user as FRAUD and permanently delete ALL ${vendorEmail}'s added tickets. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red color for dangerous action
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Mark as Fraud & Delete Tickets!",
      cancelButtonText: "No, Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/ticket/vendor/${vendorEmail}`);
        await axiosSecure.patch(`/users/${id}`, {
          role: "fraud",
        });
        refetch();
        Swal.fire(
          "Action Complete!",
          `User ${vendorEmail} has been marked as FRAUD, and all associated tickets have been deleted.`,
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to complete the fraud process (role update or ticket deletion failed). Please check the console.",
          "error"
        );
        console.error("Delete error:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }

  return (
      <div className="relative p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-(--bg-soft-accent)">

        
        {/* Header */}
        <div className="text-center py-8 mb-8 md:py-8 rounded-xl shadow-lg">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            We are <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
              TicketZone
            </span>
          </h1>
        </div>
        

        {/* --- Desktop/Tablet View (sm:block) --- */}
        <div className="hidden sm:block">
          {/* Table Container - Responsive scroll for smaller tables */}
          <div className="shadow-xl  overflow-x-auto rounded-xl">
            <table className="table w-full text-left">
              <thead className=" border border-(--border-card) bg-(--bg-card)  uppercase text-sm">
                <tr>
                  <th className="p-4 min-w-37.5">Name</th>
                  <th className="p-4 min-w-50">Email</th>
                  <th className="p-4 text-center min-w-25">Role</th>
                  <th className="p-4 text-center min-w-55">Actions</th>
                  <th className="p-4 text-center min-w-40">
                    Fraud Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b  border-(--border-card) bg-(--bg-card) shadow-sm hover:shadow-2xl hover:shadow-(--grad-start)/10 hover:border-(--border-hover) transition-all duration-300 last:border-b-0 hover:bg-base-200/50"
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
                        text-base-content bg-base-200/90 shadow-md
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
                          onClick={() => handleMakeAdmin(user)}
                          disabled={user.role === "admin"}
                          className={`
                        btn btn-sm text-white border-none transition
                        ${
                          user.role === "admin"
                            ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-200 text-base-content/70"
                            : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-md shadow-violet-500/50"
                        }
                      `}
                        >
                          Admin
                        </button>

                        {/* Make Vendor */}
                        <button
                          onClick={() => handleMakeVendor(user)}
                          disabled={user.role === "vendor"}
                          className={`
                        btn btn-sm text-white border-none transition
                        ${
                          user.role === "vendor"
                            ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-200 text-base-content/70"
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
                      {user.role === "user" || user.role === "admin" ? (
                        <span className="text-sm text-gray-400 font-mono">
                          Not available
                        </span>
                      ) : (
                        <div className="flex justify-center">
                          {user.role === "vendor" ? (
                            <button
                              onClick={() => handleMakeFraud(user)}
                              className="
                            btn btn-sm w-full text-white border-none transition 
                            bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 
                            shadow-md shadow-red-500/50
                            flex items-center gap-1
                          "
                            >
                              <AlertCircle size={16} />
                              Fraud
                            </button>
                          ) : (
                            <span className="text-sm flex items-center gap-1 text-red-500">
                              <BadgeCheck /> Fraud
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
              className="bg-base-200 p-4 rounded-xl shadow-xl border border-base-200"
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
                  text-base-content bg-base-200/90 shadow-md
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
                  onClick={() => handleMakeAdmin(user)}
                  disabled={user.role === "admin"}
                  className={`
                        btn btn-sm text-white border-none transition
                        ${
                          user.role === "admin"
                            ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-200 text-base-content/70"
                            : "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-md shadow-violet-500/50"
                        }
                      `}
                >
                  Admin
                </button>

                {/* Make Vendor */}
                <button
                  onClick={() => handleMakeVendor(user)}
                  disabled={user.role === "vendor"}
                  className={`
                        btn btn-sm text-white border-none transition
                        ${
                          user.role === "vendor"
                            ? "disabled:opacity-90 disabled:cursor-not-allowed bg-base-200 text-base-content/70"
                            : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md shadow-blue-500/50"
                        }
                      `}
                >
                  Vendor
                </button>
              </div>

              {/* Fraud Action */}
              <div className="pt-2 border-t border-base-200/50 flex justify-center">
                {user.role === "admin" || user.role === "user" ? (
                  <span className="text-sm text-gray-400 font-mono">
                    Not available
                  </span>
                ) : user.role === "vendor" ? (
                  <button
                    onClick={() => handleMakeFraud(user)}
                    className="
                            btn btn-sm w-full text-white border-none transition 
                            bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 
                            shadow-md shadow-red-500/50
                            flex items-center gap-1
                          "
                  >
                    <AlertCircle size={16} />
                    Fraud
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
  );

  
};

export default ManageUsers;
