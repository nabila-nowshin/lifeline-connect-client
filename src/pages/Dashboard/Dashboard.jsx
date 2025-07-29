import { Navigate } from "react-router";
import useRole from "../../hooks/useRoles";
import VolunteerDashBoard from "./VolunteerDashBoard";
import DonorDashboard from "./DonorDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const { role, isPending } = useRole();

  if (isPending) return <p>Loading dashboard...</p>;

  if (role === "admin") return <AdminDashboard />;
  if (role === "volunteer") return <VolunteerDashBoard />;
  if (role === "donor") return <DonorDashboard />;

  return <Navigate to="/" />;
}
