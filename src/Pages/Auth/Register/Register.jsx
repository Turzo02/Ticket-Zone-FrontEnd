import React, { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Image as ImageIcon, Mail, Lock, AlertCircle, UserPlus } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    setRegisterError(""); // Clear previous errors
    
    registerUser(data.email, data.password)
      .then((result) => {
        // Save user to database
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
          role: "user",
        };

        axiosSecure.post("/users", userInfo)
          .then((res) => {
            // console.log("User saved to database");
          });

        updateUserProfile({
          displayName: data.name,
          photoURL: data.photoURL,
        });


        navigate("/");
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-(--bg-page) text-(--text-main) transition-colors duration-300 p-4 relative overflow-hidden">
      
      {/* --- Main Card --- */}
      <div className="w-full max-w-150 bg-(--bg-card) border border-(--border-card) rounded-3xl shadow-2xl relative z-10 overflow-hidden">
        
        {/* Header Section */}
        <div className="text-center pt-10 pb-6 px-8">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-(--bg-soft-accent) text-(--grad-start)">
            <UserPlus size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
          <p className="text-(--text-muted) text-sm font-medium">
            Join us to start booking your next journey.
          </p>
        </div>

        <div className="px-8 pb-10">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Syed Naimul Islam"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all font-medium"
                />
              </div>
              {errors.name?.type === "required" && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-500 mt-1">
                  <AlertCircle size={12} /> Name is required
                </span>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">
                Profile Photo URL
              </label>
              <div className="relative group">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all font-medium"
                />
              </div>
              {errors.photoURL?.type === "required" && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-500 mt-1">
                  <AlertCircle size={12} /> Photo URL is required
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all font-medium"
                />
              </div>
              {errors.email?.type === "required" && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-500 mt-1">
                  <AlertCircle size={12} /> Email is required
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-main) transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Validation Errors */}
              {(errors.password?.type === "required" || errors.password?.type === "minLength" || errors.password?.type === "pattern") && (
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 mt-2">
                  <div className="space-y-1">
                    {errors.password?.type === "required" && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                        <AlertCircle size={12} /> Password is required
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                        <AlertCircle size={12} /> Must be at least 6 characters
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                        <AlertCircle size={12} /> Needs uppercase & lowercase letters
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Register Error Message */}
            {registerError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
                <AlertCircle size={16} />
                {registerError}
              </div>
            )}

            {/* Submit Button */}
            <button className="w-full py-3.5 rounded-xl font-bold text-(--text-inv) bg-linear-to-r from-(--grad-start) to-(--grad-end) shadow-lg shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-(--border-card)"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="px-3 bg-(--bg-card) text-(--text-muted)">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Login Link */}
          <p className="mt-8 text-center text-sm font-medium text-(--text-muted)">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="font-bold text-(--grad-start) hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
