import { createBrowserRouter } from "react-router";
import Add from "../pages/Add";
import Update from "../pages/Update";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import Profile from "../pages/Profile";
import Notallowed from "../pages/Notallowed";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: (
      <AdminPage>
        <Add />
      </AdminPage>
    ),
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <UserPage>
        <Profile />
      </UserPage>
    ),
  },
  ,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/notallowed",
    element: <Notallowed />,
  },
]);
export default router;
