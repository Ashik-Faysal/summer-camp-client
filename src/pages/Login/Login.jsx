import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signIn, googleSignIn, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/", { replace: true }); // Redirect to the home page
      })
      .catch((error) => {
        setError("loginError", { message: error.message });
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-stone-200">
        <div className="md:hero-content">
          <div>
            <iframe
              src="https://embed.lottiefiles.com/animation/38435"
              width="700"
              height="450"
            ></iframe>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm bg-stone-700  shadow-2xl">
            <h1 className="text-5xl font-bold text-center text-stone-500">
              Please Login!
            </h1>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="card-body rounded-lg"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required." })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>

              <div className="flex gap-4 mx-auto">
                <button
                  type="button"
                  onClick={googleSignIn}
                  className="btn btn-outline btn-accent mt-2"
                >
                  <img
                    className="mx-2"
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google logo"
                    width="20px"
                    height="20px"
                  />
                  Google
                </button>
              </div>
            </form>
            {errors.loginError && (
              <p className="text-red-500">{errors.loginError.message}</p>
            )}

            <span className="p-5 text-white">
              New to this Website?
              <Link
                to="/signup"
                className="label-text-alt link link-hover text-white"
              >
                Please Register..
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
