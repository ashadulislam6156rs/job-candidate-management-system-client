import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiUserAdd } from "react-icons/hi";
import { MdVisibility, MdVisibilityOff, MdEmail, MdLock } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userLogIn, userSignInGoogle } = useAuth();
  const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleLogInUser = (data) => {
    userLogIn(data.email, data.password)
      .then(() => {
        toast.success("Your Account LogIn Successfull.");
        setTimeout(() => {
          navigate(location?.state || "/");
        }, 500);
      })
      .catch((err) => toast.error(err.message));
    };

     const handleLogInGoogle = () => {
       userSignInGoogle()
         .then((res) => {
           // ** User Info  Store the database
           const userData = {
             fullName: res.user.displayName,
             photoURL: res.user.photoURL,
             email: res.user.email,
             userRole: "Staff",
           };
           axiosSecure.post("/users", userData).then(() => {
             navigate(location?.state || "/");
           });
           toast.success("Your Account LogIn Successfull.");
         })
         .catch((err) => toast.error(err.message));
     };
    



  return (
    <div className=" flex items-center justify-center p-4 py-10">
      <title>User login | eTutionTrack</title>
      <div className="card md:card-side bg-base-100 shadow-2xl max-w-xl w-full rounded-2xl overflow-hidden">
        {/* Left Side: Form Section */}
        <div className="card-body w-full lg:w-1/2 p-8 sm:p-12">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
              Welcome Back
            </h1>
            <p className="text-base-content/60 mt-2">
              Log in to continue managing your tuition platform seamlessly.
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

          <div className="divider text-base-content/40 text-sm">OR</div>

          <form onSubmit={handleSubmit(handleLogInUser)} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <label className="input mt-1 w-full input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20">
                <MdEmail className="text-base-content/50 text-xl" />
                <input
                  type="email"
                  placeholder="mail@site.com"
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

            {/* Password Input */}
            <div className="form-control mb-1">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <label className="input mt-1 w-full input-bordered flex items-center gap-2 focus-within:ring-2 ring-primary/20 relative">
                <MdLock className="text-base-content/50 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

              {/* Validation Hint (Optional styling) */}
              {errors.password ? (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              ) : (
                <p className="text-xs text-base-content/50 mt-2 ml-1">
                  Must contain 6+ chars, 1 uppercase, 1 lowercase & 1 number.
                </p>
              )}
            </div>

            <Link className="text-primary font-bold hover:underline transition-colors">
              Forget Password?
            </Link>

            {/* Login Button */}
            <button className="btn w-full mt-2 myBtn">
              <HiUserAdd className="inline-block" /> LogIn
            </button>
          </form>

          <p className="text-center text-sm text-base-content/70 mt-6">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-primary font-bold hover:underline transition-colors"
            >
              Register Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
