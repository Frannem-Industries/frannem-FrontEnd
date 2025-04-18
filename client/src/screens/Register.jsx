import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing again
    if (error) setError("");
    
    // Check password strength
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    
    // Contains number
    if (/[0-9]/.test(password)) score += 1;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return score;
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (passwordStrength < 3) {
      setError("Please choose a stronger password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms and Conditions");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setError("");
    }
  };

  const prevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      nextStep();
      return;
    }
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For demo purposes - replace with actual registration logic
      console.log("Registration data:", formData);
      
      // Redirect to login page or dashboard
      navigate("/login", { state: { registrationSuccess: true } });
    } catch (err) {
      setError("An error occurred during registration. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const slideVariants = {
    hidden: { x: step === 1 ? -300 : 300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    },
    exit: { 
      x: step === 1 ? 300 : -300, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 ? "Enter your personal information" : "Set up your password"}
          </p>
          
          {/* Progress indicator */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center">
              <motion.div 
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 1 ? "bg-primary-blue text-white" : "bg-gray-200 text-gray-600"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                1
              </motion.div>
              <div className={`h-1 w-10 ${step >= 2 ? "bg-primary-blue" : "bg-gray-200"}`}></div>
              <motion.div 
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 2 ? "bg-primary-blue text-white" : "bg-gray-200 text-gray-600"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                2
              </motion.div>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <Icon icon="mdi:alert-circle" className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 ? (
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm pr-10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      className="h-5 w-5 text-gray-400 hover:text-gray-500"
                    />
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-medium text-gray-500">Password strength:</div>
                      <div className={`text-xs font-medium ${
                        passwordStrength <= 2 ? "text-red-500" : 
                        passwordStrength <= 4 ? "text-yellow-500" : "text-green-500"
                      }`}>
                        {getPasswordStrengthText()}
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()}`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                      <li className={`flex items-center ${formData.password.length >= 8 ? "text-green-500" : ""}`}>
                        <Icon icon={formData.password.length >= 8 ? "mdi:check-circle" : "mdi:circle-outline"} className="mr-1" />
                        At least 8 characters
                      </li>
                      <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? "text-green-500" : ""}`}>
                        <Icon icon={/[A-Z]/.test(formData.password) ? "mdi:check-circle" : "mdi:circle-outline"} className="mr-1" />
                        Contains uppercase letter
                      </li>
                      <li className={`flex items-center ${/[0-9]/.test(formData.password) ? "text-green-500" : ""}`}>
                      <Icon icon={/[0-9]/.test(formData.password) ? "mdi:check-circle" : "mdi:circle-outline"} className="mr-1" />
                        Contains number
                      </li>
                      <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : ""}`}>
                        <Icon icon={/[^A-Za-z0-9]/.test(formData.password) ? "mdi:check-circle" : "mdi:circle-outline"} className="mr-1" />
                        Contains special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-blue focus:border-primary-blue"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm`}
                  placeholder="Confirm your password"
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <Link to="/terms" className="font-medium text-primary-blue hover:text-blue-700">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-primary-blue hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between">
            {step === 2 && (
              <motion.button
                type="button"
                onClick={prevStep}
                className="group relative flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                variants={itemVariants}
              >
                Back
              </motion.button>
            )}
            
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`group relative ${step === 1 ? "w-full" : "ml-auto"} flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              variants={itemVariants}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Icon icon="eos-icons:loading" className="animate-spin mr-2" />
                  {step === 1 ? "Continuing..." : "Creating account..."}
                </span>
              ) : (
                step === 1 ? "Continue" : "Create Account"
              )}
            </motion.button>
          </div>

          <motion.div className="text-center mt-4" variants={itemVariants}>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary-blue hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;

