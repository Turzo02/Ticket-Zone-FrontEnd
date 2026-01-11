import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn, KeyRound } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue, // Used to auto-fill credentials
    formState: { errors },
  } = useForm();

  // --- Auto Fill Handler ---
  const handleAutoFill = (role) => {
    let email = "";
    let password = "";

    switch (role) {
      case "admin":
        email = "admin2026@ticketzone.com";
        password = "Admin!2026#Secure";
        break;
      case "vendor":
        email = "vendor2026@ticketzone.com";
        password = "Vendor!2026#Secure";
        break;
      case "user":
        email = "user2026@ticketzone.com";
        password = "User!2026#Secure";
        break;
      default:
        break;
    }

    setValue("email", email);
    setValue("password", password);
  };

  const handleLogin = (data) => {
    setLoginError("");
    signInUser(data.email, data.password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
          background: "oklch(var(--bg-card))",
          color: "oklch(var(--text-main))",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setLoginError("Invalid email or password.");
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-(--bg-page) text-(--text-main) transition-colors duration-300 p-4 relative overflow-hidden">


      {/* Main Card */}
      <div className="w-full max-w-125 bg-(--bg-card) border border-(--border-card) rounded-3xl shadow-2xl relative z-10 overflow-hidden">
        
        {/* Header */}
        <div className="text-center pt-8 pb-4 px-8">
          <div className="inline-flex items-center justify-center p-3 mb-3 rounded-2xl bg-(--bg-soft-accent) text-(--grad-start)">
            <LogIn size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Welcome Back!</h1>
          <p className="text-(--text-muted) text-sm font-medium">
            Sign in to continue to TicketZone
          </p>
        </div>

        <div className="px-8 pb-8">
          
          {/* --- Auto Fill Credentials Section --- */}
          <div className="mb-6 p-4 bg-(--bg-soft-accent) rounded-xl border border-(--border-card)">
            <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wide mb-3 flex items-center gap-2">
              <KeyRound size={14} /> Quick Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAutoFill("admin")}
                className="px-2 py-1.5 text-xs font-bold rounded-lg bg-(--bg-card) border border-(--border-card) hover:border-(--grad-start) hover:text-(--grad-start) transition-all shadow-sm"
              >
                Admin
              </button>
              <button
                onClick={() => handleAutoFill("vendor")}
                className="px-2 py-1.5 text-xs font-bold rounded-lg bg-(--bg-card) border border-(--border-card) hover:border-(--grad-start) hover:text-(--grad-start) transition-all shadow-sm"
              >
                Vendor
              </button>
              <button
                onClick={() => handleAutoFill("user")}
                className="px-2 py-1.5 text-xs font-bold rounded-lg bg-(--bg-card) border border-(--border-card) hover:border-(--grad-start) hover:text-(--grad-start) transition-all shadow-sm"
              >
                User
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all font-medium"
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
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide">
                  Password
                </label>
      
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-main) transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-500 mt-1">
                  <AlertCircle size={12} /> Password is required
                </span>
              )}
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
                <AlertCircle size={16} />
                {loginError}
              </div>
            )}

            {/* Submit Button */}
            <button className="w-full py-3.5 rounded-xl font-bold text-(--text-inv) bg-linear-to-r from-(--grad-start) to-(--grad-end) shadow-lg shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-(--border-card)"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="px-3 bg-(--bg-card) text-(--text-muted)">Or continue with</span>
            </div>
          </div>

          <SocialLogin />

          <p className="mt-6 text-center text-sm font-medium text-(--text-muted)">
            Don't have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="font-bold text-(--grad-start) hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
