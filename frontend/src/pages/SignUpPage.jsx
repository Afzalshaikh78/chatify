import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col lg:flex-row rounded-xl overflow-hidden">
          {/* FORM COLUMN - LEFT SIDE */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center max-w-md mx-auto lg:max-w-none lg:mx-0">
            {/* HEADING TEXT */}
            <div className="text-center lg:text-left mb-6 sm:mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <MessageCircleIcon className="size-6 sm:size-8 text-cyan-500" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200">
                  Chatify
                </h1>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-200 mb-2">
                Create Account
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Sign up for a new account
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* FULL NAME */}
              <div>
                <label className="auth-input-label">Full Name</label>
                <div className="relative">
                  <UserIcon className="auth-input-icon" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* EMAIL INPUT */}
              <div>
                <label className="auth-input-label">Email</label>
                <div className="relative">
                  <MailIcon className="auth-input-icon" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input"
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <label className="auth-input-label">Password</label>
                <div className="relative">
                  <LockIcon className="auth-input-icon" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="auth-btn" disabled={isSigningUp}>
                {isSigningUp ? (
                  <LoaderIcon className="size-5 animate-spin mx-auto" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-4 sm:mt-6">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </div>

          {/* FORM ILLUSTRATION - RIGHT SIDE */}
          <div className="hidden lg:flex lg:flex-1 bg-slate-800/50 items-center justify-center p-8">
            <div className="text-center max-w-md">
              <img
                src="/signup.png"
                alt="People using mobile devices"
                className="w-full h-auto object-contain mb-6"
              />
              <h3 className="text-lg font-semibold text-slate-200 mb-4">
                Start Your Journey Today
              </h3>
              <div className="flex justify-center gap-4">
                <span className="auth-badge">Free</span>
                <span className="auth-badge">Easy Setup</span>
                <span className="auth-badge">Private</span>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default SignUpPage;
