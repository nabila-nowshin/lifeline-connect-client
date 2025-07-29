import { Navigate } from "react-router";

import AdminDashboard from "./AdminDashboard";
import useRole from "../../hooks/useRoles";

const DashboardLayout = () => {
  const { role, isPending } = useRole();

  if (isPending) return <p>Loading dashboard...</p>;

  if (role === "admin") return <AdminDashboard />;
  //   if (role === "volunteer") return <VolunteerDashboard />;
  //   if (role === "donor") return <DonorDashboard />;

  return <Navigate to="/" />;
};

export default DashboardLayout;
