import { Outlet, Navigate } from "react-router";
import Sidebar from "../../components/Sidebar";
import useRole from "../../hooks/useRoles";

const DashboardLayout = () => {
  const { role, isPending } = useRole();

  if (isPending) return <p>Loading dashboard...</p>;

  if (!role) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
