import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, password, photoURL } = data;

    // Password validation checks
    if (password.length < 6) {
      setError("password", {
        message: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("password", {
        message: "Password must contain at least one capital letter.",
      });
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("password", {
        message: "Password must contain at least one special character.",
      });
      return;
    }

    // Clear password error if all checks pass
    clearErrors("password");

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoURL);
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/"); // Navigate to the "/" page
        reset();

        Swal.fire({
          title: "Success!",
          text: "Registration Successful.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            <span className="text-orange-500">Please</span>
            <span className="text-stone-600">Register!</span>
          </h1>
        </div>
        <div className="md:flex gap-6">
          <div>
            <iframe
              src="https://embed.lottiefiles.com/animation/133133"
              width="700"
              height="510"
            ></iframe>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-black">
            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required." })}
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
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
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL")}
                  placeholder="photo url"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <p className="text-red-500">{errors.photoURL.message}</p>
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
                  <Link
                    to="/login"
                    className="p-1 label-text-alt link link-hover text-white"
                  >
                    Have Already an Account? Please Login
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
