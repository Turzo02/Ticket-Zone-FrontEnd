import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import  useAuth  from "../../Hooks/useAuth";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
const UserProfile = () => {

  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {
    data: loggedInUser = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["LatestUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data
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
    <div className="rounded-2xl border border-gray-200  p-6 shadow-sm dark:border-gray-800 dark:bg-card-dark sm:p-8">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-display">
        User Profile
      </h3>
      <div className="flex items-start gap-6 sm:items-center">
        <div className="relative">
          <div
            className="h-24 w-24 rounded-full bg-slate-100 bg-cover bg-center ring-4 ring-white dark:ring-card-dark"
            style={{
              backgroundImage:
                `url('${loggedInUser.photoURL}')`,
            }}
          ></div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              {loggedInUser.name}
            </h2>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary dark:bg-primary/20">
              {loggedInUser.role}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
           {loggedInUser.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
