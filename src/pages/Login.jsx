import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, setUser, signInWithGoogle } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [emailForgotten, setEmailForgotten] = useState("");

  // email / password
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    signInUser(email, password)
      .then((res) => {
        toast.success("Logged in successfully! 🌿");
        setUser(res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(`Oops... ${err.message}`));
  };

  // Google
  const handleGoogleLogin = () => {
    signInWithGoogle().then((user) => {
      if (user) navigate(from, { replace: true });
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div
        className="max-w-md w-full bg-white/30   
  backdrop-blur-md       
  border border-white/50 rounded-xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Login to JourneyBay
        </h2>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-bordered w-full"
            required
            onChange={(e) => setEmailForgotten(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <div className="text-right mt-1">
            <Link
              state={{ prefilledEmail: emailForgotten }}
              to="/forgetPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider my-4">or</div>

        <button
          className="btn w-full border border-gray-300 hover:bg-gray-100"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-base-content">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
