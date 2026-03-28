import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isRequestingForToken } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError = "Email is invalid";
      return;
    }
    setError("");
    try {
      // await dispatch(forgotPassword({ email })).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      setError(error || "Failed to send password reset email");
    }
  };
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-slate-800">
                Check your email
              </h1>
              <p className="text-slate-600">
                We've sent a password reset link to your email address.
              </p>
            </div>
            <div className="card">
              <div className="text-center">
                <p className="text-slate-700 mb-4">
                  If an account with <strong>{email}</strong> exists, you will
                  receive a password reset link.
                </p>
              </div>
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
              <button
                className="w-full btn-outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                Send Another mail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-500 rounded-full mb-4">
              <KeyRound className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Forgot Password?
            </h1>
            <p className="text-slate-600 mt-2">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>
          {/* Login Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error.general}</p>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className={`input ${error.email ? "input-error" : ""}`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter Your Email here.."
                  disabled={isRequestingForToken}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              {/* submit Button */}
              <button
                type="submit"
                disabled={isRequestingForToken}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequestingForToken ? (
                  <div className="flex justify-center items-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending Reset Link...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
