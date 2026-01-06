import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiUserAdd } from "react-icons/hi";
import {
  MdVisibility,
  MdVisibilityOff,
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdBadge,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoPersonSharp } from "react-icons/io5";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Student");
  const [gender, setGender] = useState("Male");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUserInfo, userRegister, userSignInGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const handleRegister = (data) => {
    console.log(data);

    const photoFile = data.photoURL[0];

    // ** User Register

    // Create FormData
    const formData = new FormData();
    formData.append("image", photoFile);

    userRegister(data.email, data.password)
      .then(() => {
        // ** Update User Info
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_image_api_Key
            }`,
            formData
          )
          .then((res) => {
            const photoURL = res.data.data.url;
            const updateInfo = {
              displayName: data.fullName,
              photoURL: photoURL,
            };
            updateUserInfo(updateInfo);

            navigate(location?.state || "/");

            setTimeout(() => {
              toast.success("Your Account has been Successfully Created.");
            }, 500);

            //** User Info  Store the database
            const userData = {
              fullName: data.fullName,
              photoURL: photoURL,
              email: data.email,
              contactNumber: data.contactNumber,
              userRole: data.role,
              gender: data.gender,
            };

            axiosSecure.post("/users", userData);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
    };
    

    const handleLogInGoogle = () => {
      userSignInGoogle()
        .then((res) => {
          // ** User Info  Store the database
          const userData = {
            fullName: res.user.displayName,
            photoURL: res.user.photoURL,
            email: res.user.email,
            userRole: "Student",
          };
          axiosSecure.post("/users", userData).then(() => {
            navigate(location?.state || "/");
          });
          toast.success("Your Account LogIn Successfull.");
        })
        .catch((err) => toast.error(err.message));
    };


  return (
    <div className="bg-base-200 flex items-center justify-center p-4 font-sans">
      <title>Create Account | eTutionTrack</title>
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-3xl w-full rounded-2xl overflow-hidden">
        {/* Left Side: Form Section */}
        <div className="card-body w-full lg:w-1/2 p-8 sm:p-10">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-base-content">
              Create Account
            </h1>
            <p className="text-base-content/60 mt-1">
              Sign up to start managing your tuition experience seamlessly.
            </p>
          </div>

          {/* Social Register */}
          <button
            onClick={handleLogInGoogle}
            className="btn btn-outline w-full text-base font-medium hover:bg-base-200 border-base-300 transition-all"
          >
            <FcGoogle size={24} />
            Sign up with Google
          </button>

          <div className="divider text-base-content/40 text-sm my-4">OR</div>

          {/* Form Submit */}
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name Input */}
            <div className="form-control">
              <label className="label pt-0 pb-1">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <label className="input w-full input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20">
                <MdPerson className="text-base-content/50 text-lg" />
                <input
                  type="text"
                  {...register("fullName", { required: true })}
                  placeholder="John Doe"
                  className="grow"
                />
              </label>
              {errors.fullName && (
                <p className="text-red-500 pt-2 font-semibold">
                  Full Name is required
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label pt-0 pb-1">
                <span className="label-text font-semibold">Email</span>
              </label>
              <label className="input w-full input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20">
                <MdEmail className="text-base-content/50 text-lg" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="grow"
                  {...register("email", { required: true })}
                />
              </label>
              {errors.email && (
                <p className="text-red-500 pt-2 font-semibold">
                  Email is required
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Input */}
              <div className="form-control">
                <label className="label pt-0 pb-1">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <label className="input w-full input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20 relative">
                  <MdLock className="text-base-content/50 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="grow"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters!",
                      },
                      validate: {
                        hasUpper: (value) =>
                          /[A-Z]/.test(value) ||
                          "Must include at least 1 uppercase letter!",
                        hasLow: (value) =>
                          /[a-z]/.test(value) ||
                          "Must include at least 1 lowercase letter!",
                        hasNum: (value) =>
                          /\d/.test(value) || "Must include at least 1 number!",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs btn-circle btn-ghost absolute right-2 text-lg text-base-content/60"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </label>
                {/* Error messages */}
                {errors.password && (
                  <p className="text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label pt-0 pb-1">
                  <span className="label-text font-semibold">Gender</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20">
                  <IoPersonSharp className="text-base-content/50 text-lg" />
                  <select
                    {...register("gender", { required: true })}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="grow bg-transparent outline-none border-none cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {errors.role && (
                  <p className="text-red-500 pt-2 font-semibold">
                    Gender is required
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Role (Grid for Tablet/Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="form-control">
                <label className="label pt-0 pb-1">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                <label className="input input-bordered flex w-full items-center gap-2 focus-within:ring-2 ring-primary/20">
                  <MdPhone className="text-base-content/50 text-lg" />
                  <input
                    type="tel"
                    {...register("contactNumber", { required: true })}
                    placeholder="+880..."
                    className="grow w-full"
                  />
                </label>
                {errors.contactNumber && (
                  <p className="text-red-500 pt-2 font-semibold">
                    Phone number is required
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="form-control">
                <label className="label pt-0 pb-1">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20">
                  <MdBadge className="text-base-content/50 text-lg" />
                  <select
                    {...register("role", { required: true })}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="grow bg-transparent outline-none border-none cursor-pointer"
                  >
                    <option value="Student">Staff</option>
                    <option value="Tutor">Candidate</option>
                  </select>
                </label>
                {errors.role && (
                  <p className="text-red-500 pt-2 font-semibold">
                    Role is required
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button className="btn w-full myBtn">
              <HiUserAdd className="inline-block" /> Register
            </button>
          </form>

          <p className="text-center text-sm text-base-content/70 mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-primary font-bold hover:underline transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
