import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Login Now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {/* Form  */}
              <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="input border border-gray-400"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-red-600">Email is required</span>
                  )}

                  {/* password */}
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input pr-10 border border-gray-400"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                      })}
                    />

                    {/* Toggle Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {/* error messages */}
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">Password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600">
                      Password must be at least 6 characters long
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600">
                      Must include uppercase & lowercase letters
                    </span>
                  )}

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  {loginError && (
                    <span className="text-red-600">{loginError}</span>
                  )}
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
              </form>
              <SocialLogin></SocialLogin>
              <p>
                Don"t have an account? Please{" "}
                <Link
                  state={location.state}
                  to="/register"
                  className="font-semibold text-blue-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
