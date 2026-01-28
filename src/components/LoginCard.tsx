import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, type UserObject } from "../context/AuthContext";

interface LoginFormData {
  email:string,
  password:string
}

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // to show/hide password in input field

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: "onBlur" });

  // This function runs only if validation passes
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setServerError("");

    try {
      // ---API CALL HERE ---
      const userObj:UserObject = {
        email: data.email,
        token: "jwt-token-gigmedia",
      };
      login(userObj);
      console.log("Form Data Submitted:", data);
      navigate("/");
    } catch(err: unknown) {
      setServerError(`Invalid email or password. Please try again: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md h-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8">
        <div className="mb-6 text-center">
          {/* <h2 className="text-xl font-bold text-gray-800">
            Welcome to Gigmedia App
          </h2> */}
          <p className="text-sm text-gray-500 mb-8 items-start">
            Please login to access your dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* EMAIL FIELD */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="name@gigmedia.com"
                className={`
                    w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border 
                    focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all
                    ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}
                  `}
                {...register("email", {
                  required: "Email is required",
                  onChange: () => setServerError(""),
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@(gigmediaapp\.com|hkimedia\.com)$/i,
                    message:
                      "Please use your valid official @gigmediaapp.com or @hkimedia.com email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {/* FUTURE: FORGOT PASSWORD FEATURE */}
              {/* <a href="#" className="text-xs font-medium text-red-600 hover:text-red-700">
                  Forgot password?
                </a> */}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                // type="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className={`
                    w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border 
                    focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all
                    ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}
                  `}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password must be 8+ chars, with 1 number, 1 uppercase, and 1 lowercase",
                  },
                })}
              />
              {/* RIGHT ICON: TOGGLE BUTTON */}
              <button
                type="button" // Important: prevents form submission
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SERVER ERROR MESSAGE */}
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
              <span className="font-bold">Error:</span> {serverError}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="
                w-full flex items-center justify-center py-2.5 px-4 
                border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                disabled:opacity-70 disabled:cursor-not-allowed transition-colors
              "
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* FOOTER AREA (Usually for T&C since Signup is disabled) */}
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          By logging in, you agree to Gigmedia's{" "}
          <a href="#" className="underline hover:text-gray-700">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
