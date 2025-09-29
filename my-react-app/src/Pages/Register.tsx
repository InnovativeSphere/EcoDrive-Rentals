// src/pages/RegisterPage.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerUser, loginUser, resetAuthStatus } from "../redux/userSlice";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, success, userInfo } = useAppSelector(
    (state) => state.user
  );

  const handleNext = () => {
    if (currentStep === 1 && (!firstName || !lastName || !email || !password)) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 2 && (!dob || !phoneNumber || !address || !gender)) {
      return;
    }

    dispatch(
      registerUser({
        firstName,
        lastName,
        username,
        email,
        password,
        dob,
        phoneNumber,
        address,
        gender,
      })
    );
  };

  // 🔑 Auto-login after successful registration
  useEffect(() => {
    if (success && userInfo) {
      // Immediately log the user in with the same credentials
      dispatch(loginUser({ username, password }));
      navigate("/dashboard");
      dispatch(resetAuthStatus());
    }
  }, [success, userInfo, username, password, navigate, dispatch]);

  return (
    <div className="bg-gray-900 text-gray-300 flex flex-col items-center justify-center relative min-h-screen p-4">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-lg border border-gray-700 my-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
          Register for EcoDrive
        </h1>
        <p className="text-center text-gray-400 mb-6">Step {currentStep} of 2</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* First/Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-lg font-medium text-gray-300 mb-2">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-lg font-medium text-gray-300 mb-2">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-lg font-medium text-gray-300 mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-300 mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition"
              >
                Next
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* DOB & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-lg font-medium text-gray-300 mb-2">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-lg font-medium text-gray-300 mb-2">
                    Gender:
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="preferNotToSay">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-300 mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-lg font-medium text-gray-300 mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-600 text-white"
                />
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-1/2 bg-gray-600 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-700 transition"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </>
          )}

          {/* Error/Success messages */}
          {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        </form>

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
