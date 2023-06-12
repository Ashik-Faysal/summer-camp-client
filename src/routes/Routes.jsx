import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PopularInstructors from "../pages/Home/PopularInstructors";
import PopularClasses from "../pages/Home/PopularClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructor",
        element: <PopularInstructors />,
      },
      {
        path: "/classes",
        element: <PopularClasses />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
