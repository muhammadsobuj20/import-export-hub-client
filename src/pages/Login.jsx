import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import usePageTitle from "../Hooks/usePageTitle";
import loginImg from "/login_cover.webp";

const Login = () => {
  usePageTitle("Export Import Hub | Login");
  const { signInUser, signInWithGoogle, forgetPassword } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    toast.loading("Logging in...", { id: "login" });

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!", { id: "login" });
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "login" });
      });
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      await forgetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-linear-to-br from-pink-100 to-purple-200 py-10 px-4">
      {/* Left side image */}
      <div className="hidden md:flex justify-center w-1/2">
        <img
          className="max-h-[500px] "
          src={loginImg}
          alt="Login Illustration"
        />
      </div>

      {/* Right side form */}
      <div className="card bg-white/80 backdrop-blur-sm w-full max-w-sm mx-auto shadow-2xl border border-pink-200 rounded-2xl mt-6 md:mt-0">
        <div className="card-body">
          <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-linear-to-r from-pink-600 to-purple-600">
            Login
          </h1>

          {/* Login Form */}
          <form onSubmit={handleLogIn} className="space-y-4 mt-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-full focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="input input-bordered w-full rounded-full pr-10 focus:ring-2 focus:ring-pink-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-xl text-gray-500 hover:text-pink-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-pink-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn w-full rounded-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-sm text-gray-400">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full flex items-center justify-center gap-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500" /> Login with Google
          </button>

          <p className="text-center mt-4 text-sm">
            New to our website?{" "}
            <Link
              to="/register"
              className="text-pink-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
