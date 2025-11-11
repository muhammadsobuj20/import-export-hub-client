import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import usePageTitle from "../Hooks/usePageTitle";

const Register = () => {
   usePageTitle("Export Import Hub | Registration");
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const displayName = form.displayName.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasMinLength) {
      setPasswordError(
        "Password must include at least one uppercase, one lowercase, one number and be 6+ characters long."
      );
      toast.error("Invalid password format!");
      return;
    }

    toast.loading("Creating account...", { id: "register" });

    try {
      const result = await createUser(email, password);
      await updateUserProfile(displayName, photoURL);
      toast.success("Registration successful!", { id: "register" });
      form.reset();
      navigate("/");
      result.user;
    } catch (error) {
      toast.error(error.message, { id: "register" });
    }
  };

  const handleGoogleSignIn = () => {
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then(() => {
        toast.success("User created successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
      
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="card bg-white w-full mx-auto max-w-sm shadow-2xl border border-gray-100 rounded-3xl p-6">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-3">
            <input
              type="text"
              name="displayName"
              placeholder="Full Name"
              required
              className="input input-bordered w-full rounded-full"
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Profile Photo URL"
              className="input input-bordered w-full rounded-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="input input-bordered w-full rounded-full"
            />

            {/*  Password  eye toggle */}
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

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            <button
              type="submit"
              className="btn w-full text-white font-semibold rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
            >
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
