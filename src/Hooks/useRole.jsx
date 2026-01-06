import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {isLoading: roleLoading, data: role = "" } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data?.userRole || "";
        }
    })



    return { role , roleLoading };
};

export default useRole;