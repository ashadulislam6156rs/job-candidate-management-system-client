import axios from "axios";
import React from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {

//    const { user, userLogOut } = useAuth();
//    const navigate = useNavigate();

//    useEffect(() => {
//      const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
//       if (user?.accessToken) {
//         config.headers.Authorization = `Bearer ${user.accessToken}`;
//       }

//        return config;
//      });
     
// const resInterceptors = axiosSecure.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const status = error?.response?.status;

//     if (status === 401 || status === 403) {
     
//       userLogOut();
//       navigate("/login");
//     }

//     return Promise.reject(error);
//   }
// );

//      return () => {
//        axiosSecure.interceptors.request.eject(reqInterceptors);
//        axiosSecure.interceptors.response.eject(resInterceptors);
//      };
//    }, [user, navigate, userLogOut]);

  return axiosSecure;
};

export default useAxiosSecure;
