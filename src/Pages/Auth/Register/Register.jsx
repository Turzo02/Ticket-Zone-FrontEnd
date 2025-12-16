import React, { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const  axiosSecure  = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    // console.log(data);
    registerUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        //save user to database
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
          role: "user",
        };
        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            // console.log(res.data, "user saved to database");
          })
          .catch((error) => {
            // console.log(error);
          });

        updateUserProfile({
          displayName: data.name,
          photoURL: data.photoURL,
        });
        navigate( "/");
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Register Now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {/* Form  */}
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="input border border-gray-400"
                    placeholder="Enter Your Name"
                  />
                  {errors.name?.type === "required" && (
                    <span className="text-red-600">Name is required</span>
                  )}
                  {/* photoURL */}
                  <label className="label">photoURL</label>
                  <input
                    type="text"
                    {...register("photoURL", { required: true })}
                    className="input border border-gray-400"
                    placeholder="Ex: https://example.com/image.jpg"
                  />
                  {errors.photoURL?.type === "required" && (
                    <span className="text-red-600">photoURL is required</span>
                  )}
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

                  {registerError && (
                    <span className="text-red-600">{registerError}</span>
                  )}

                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
              </form>
              <SocialLogin></SocialLogin>
              <p>
                Already have an account? Please{" "}
                <Link
                  to="/login"
                  state={location.state}
                  className="text-blue-500 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
