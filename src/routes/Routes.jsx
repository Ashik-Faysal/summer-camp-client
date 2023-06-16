import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PopularInstructors from "../pages/Home/PopularInstructors";
import SelectedClass from "../pages/Shared/SelectedClass";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import InstructorDash from "../pages/Dashboard/InstructorDash";

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
        element: <SelectedClass />,
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
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "userhome",
        element: <UserHome/>,
      },
      {
        path: "instructors",
        element:<InstructorDash/>
      },
      // admin routes
      {
        path: "adminhome",
        element: (
            <AdminHome/>
       
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers/>
          </AdminRoute>
        ),
      },
    ],
  },
]);
