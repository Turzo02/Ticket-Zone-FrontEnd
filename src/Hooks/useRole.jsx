import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiousSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { isLoading: roleLoading, data: role } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.role;
    },
  });

  return {
    role,
    roleLoading,
  };
};

export default useRole;
