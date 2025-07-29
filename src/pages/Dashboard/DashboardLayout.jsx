// import AdminDashboard from "./AdminDashboard";
// import DonorDashboard from "./DonorDashboard";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";
import useRole from "../../hooks/useRoles";

const DashboardLayout = () => {
  const { role, isPending } = useRole();

  //   if (isPending) return <p>Loading dashboard...</p>;

  //   if (role === "admin") return <AdminDashboard />;
  //   if (role === "volunteer") return <VolunteerDashboard />;
  //   if (role === "donor") return <DonorDashboard />;

  //   return <Navigate to="/" />;
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet /> {/* Role-specific pages will render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
