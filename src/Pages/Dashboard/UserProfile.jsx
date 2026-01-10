import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import useAuth from "../../Hooks/useAuth";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: loggedInUser = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["LatestUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader></SwappingDotLoader>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }
  return (
    <div className="rounded-2xl border border-base-200 p-6 shadow-md bg-base-200 sm:p-8 text-base-content">
      <div className="flex items-start gap-4 sm:items-center">
        <div className="relative">
          <div
            className="h-16 w-16 md:w-24 md:h-24 rounded-full bg-base-200 bg-cover bg-center shadow-md"
            style={{
              backgroundImage: `url('${loggedInUser.photoURL}')`,
            }}
          ></div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-base-content font-display">
              {loggedInUser.name}
            </h2>
            <span
              className="
    badge badge-lg font-bold text-white border-none transition 
    px-6 py-4 
    bg-linear-to-r  from-green-500 to-green-700 
    shadow-xl shadow-green-600/20
    rounded-xl uppercase
  "
            >
              {loggedInUser.role}
            </span>
          </div>
          <p className="text-base-content/80">{loggedInUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
