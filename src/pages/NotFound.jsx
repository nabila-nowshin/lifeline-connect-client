import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 px-4">
      <div className="text-center max-w-md">
        <FaExclamationTriangle className="text-error text-6xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-error mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-base-content mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-wide">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
