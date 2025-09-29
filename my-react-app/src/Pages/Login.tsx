// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser, resetAuthStatus } from "../redux/userSlice";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState<string>(""); // ✅ username OR email
  const [password, setPassword] = useState<string>("");

  const { loading, error, success, userInfo } = useAppSelector(
    (state) => state.user
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // ✅ Send either username or email depending on input
    if (identifier.includes("@")) {
      dispatch(loginUser({ email: identifier, password }));
    } else {
      dispatch(loginUser({ username: identifier, password }));
    }
  };

  // Navigate after login success
  useEffect(() => {
    if (success && userInfo) {
      navigate("/dashboard");
      dispatch(resetAuthStatus());
    }
  }, [success, userInfo, navigate, dispatch]);

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
          Login to EcoDrive
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="identifier"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              Username or Email:
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Login successful!</div>}
        </form>

        <p className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-500 hover:text-red-400 font-semibold transition duration-300"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
