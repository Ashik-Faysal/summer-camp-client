import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState(null);

  const { signIn, signInWithGoogle, upDateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        upDateProfile(email, photoURL);
        form.reset();
        setError("");
        navigate(from);
      })
      .catch((error) => setError(error.message));
  };
  return (
    <>
      <div className="hero min-h-screen bg-stone-200">
        <div className="md:hero-content">
          <div>
            <iframe
              src="https://embed.lottiefiles.com/animation/27315"
              width="700"
              height="450"
            ></iframe>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm bg-black  shadow-2xl">
            <h1 className="text-5xl font-bold text-center text-stone-500">
              Please Login !
            </h1>
            <form onSubmit={handleLogin} className="card-body rounded-lg">
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
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
                  onClick={signInWithGoogle}
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
            {error && <p className="text-red-500">{error}</p>}

            <span className="p-5 text-white">
              New to this Website?
              <Link
                to="/register"
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
