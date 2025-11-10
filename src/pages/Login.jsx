import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";

const Login = () => {
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
    console.log(error);
    toast.error(error.message);
  }
};

const handleGoogleSignIn = () => {
  signInWithGoogle()
    .then(() => {
      navigate(location?.state || "/");
    })
    .catch((error) => {
      console.log(error);
    });
};

  
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      {" "}
      <div className="card-body">
        {" "}
        <h1 className="text-3xl font-bold text-center">Login</h1>{" "}
        <form onSubmit={handleLogIn}>
          {" "}
          <fieldset className="fieldset">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)} 
              className="input input-bordered w-full rounded-full"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="input input-bordered w-full rounded-full pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-xl text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {/* {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )} */}
            <div>
              {" "}
              <a onClick={handleForgotPassword} className="link link-hover">
                Forgot password?
              </a>{" "}
            </div>{" "}
            <button
              type="submit"
              className="btn w-full text-white font-semibold rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
            >
              Login
            </button>{" "}
          </fieldset>{" "}
        </form>{" "}
        <button
          onClick={handleGoogleSignIn}
          className="btn w-full text-white font-semibold rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
        >
          {" "}
          <FaGoogle /> Login with Google{" "}
        </button>{" "}
        <p className="text-center">
          {" "}
          New to our website? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/register">
            {" "}
            Register{" "}
          </Link>{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default Login;
