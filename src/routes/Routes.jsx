import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      //   {
      //     path: "/packages",
      //     Component: AllPackages,
      //   },
      //   {
      //     path: "/packages/:id",
      //     element: (
      //       <PrivateRoute>
      //         <PackageDetails></PackageDetails>
      //       </PrivateRoute>
      //     ),
      //     loader: ({ params }) =>
      //       fetch(`https://journey-bay-server.vercel.app/packages/${params.id}`),
      //   },
      //   {
      //     path: "/about",
      //     Component: About,
      //   },
      //   {
      //     path: "/forgetPassword",
      //     element: <ForgotPassword></ForgotPassword>,
      //   },
      //   {
      //     path: "/myBookings",
      //     element: (
      //       <PrivateRoute>
      //         <MyBookings></MyBookings>
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/addPackage",
      //     element: (
      //       <PrivateRoute>
      //         <AddPackage></AddPackage>
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/manageMyPackages",
      //     element: (
      //       <PrivateRoute>
      //         <ManagePackages></ManagePackages>
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/myBookings",
      //     element: (
      //       <PrivateRoute>
      //         <MyBookings></MyBookings>
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/update-package/:id",
      //     element: (
      //       <PrivateRoute>
      //         <UpdatePackage></UpdatePackage>
      //       </PrivateRoute>
      //     ),
      //   },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
