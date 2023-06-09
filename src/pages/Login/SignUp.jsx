import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
  const { user, createUser, updateUserProfile } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate()

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    console.log(name, email, password, photoURL);

    // Password validation checks
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one capital letter.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      return;
    }

    // Clear password error if all checks pass
    setPasswordError("");

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoURL);
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/") // Navigate to the "/" page
        form.reset();
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
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="photo url"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
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
