import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../provider/PrivateRoute";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/MyProfile";
import CreateDonation from "../pages/CreateDonation";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import MyDonationRequests from "../pages/MyDonationRequests";
import AllUsers from "../pages/AdminComponents/AllUsers";
import AllDonationRequests from "../pages/AdminComponents/AllDonationRequests";
import ContentManagement from "../pages/AdminComponents/ContentManagement";
import AddBlog from "../pages/AdminComponents/AddBlog";
import SearchDonors from "../pages/SerachDonors";
import PendingDonations from "../pages/PendingDonations";
import BlogPage from "../pages/BlogPage";
import BlogDetails from "../pages/BlogDetails";
import FAQ from "../pages/FAQ";

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
        path: "/search",
        Component: SearchDonors,
      },
      {
        path: "/donation",
        Component: PendingDonations,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/blogs",
        Component: BlogPage,
      },
      {
        path: "/blogs/:id",
        Component: BlogDetails,
      },
      {
        path: "faq",
        element: (
          <PrivateRoute>
            <FAQ></FAQ>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: "profile",
            Component: MyProfile,
          },
          {
            path: "donation-request/:id",
            element: (
              <PrivateRoute>
                <DonationRequestDetails></DonationRequestDetails>
              </PrivateRoute>
            ),
          },
          {
            path: "my-donation-requests",
            Component: MyDonationRequests,
          },
          {
            path: "create-donation",
            Component: CreateDonation,
          },
          // ADMIN
          {
            path: "all-users",
            Component: AllUsers,
          },
          {
            path: "manage-donations",
            Component: AllDonationRequests,
          },
          {
            path: "content-management",
            Component: ContentManagement,
          },
          {
            path: "content-management/add-blog",
            Component: AddBlog,
          },
        ],
      },
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
