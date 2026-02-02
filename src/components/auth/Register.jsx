import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  validateEmail,
  validatePhone,
  validateName,
  validatePassword,
  checkPasswordStrength,
  validateAgeAgainstGender,
  getMinAgeForGender,
  formatDateForAPI,
} from "../../utils/validation.js";
import { toast } from "../../utils/toast.js";
import "../../styles/Register.css";

// Constants for form options
const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "never-married", label: "Never Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "awaiting-divorce", label: "Awaiting Divorce" },
];

const PROFILE_FOR_OPTIONS = [
  { value: "self", label: "Myself" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "sibling", label: "Sibling" },
  { value: "relative", label: "Relative" },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Account Creation
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,

    // Step 2: Profile Creation
    profileFor: "self",
    gender: "",
    dob: "",
    maritalStatus: "",
    religion: "",
    caste: "",
    motherTongue: "",
    phone: "",
    city: "",
    state: "",
    country: "India",
    education: "",
    otherEducation: "",
    occupation: "",
    otherOccupation: "",
    income: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    strengthLevel: "weak",
    results: {},
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Format date input as user types (DD/MM/YYYY)
  const formatDateInput = (value) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Limit to 8 digits (DDMMYYYY)
    const limited = numbers.slice(0, 8);

    // Format as DD/MM/YYYY
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 4) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    } else {
      return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Format date input automatically
    let processedValue = value;
    if (name === "dob" && type === "text") {
      processedValue = formatDateInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    // Clear error for this field when user starts typing. If gender changes, also clear dob (age limit depends on gender).
    if (errors[name] || (name === "gender" && errors.dob)) {
      setErrors((prev) => {
        const next = { ...prev, [name]: "" };
        if (name === "gender" && prev.dob) next.dob = "";
        return next;
      });
    }

    // Update password strength indicator
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(processedValue));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!validateName(formData.firstName)) {
      newErrors.firstName = "First name must be 2-50 letters";
    }
    if (!validateName(formData.lastName)) {
      newErrors.lastName = "Last name must be 2-50 letters";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password does not meet requirements";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    // Date of birth validation (Female 18+, Male 22+)
    if (!formData.dob) {
      newErrors.dob = "Please enter your date of birth";
    } else {
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (!datePattern.test(formData.dob)) {
        newErrors.dob = "Please enter date in DD/MM/YYYY format";
      } else if (!validateAgeAgainstGender(formData.dob, formData.gender)) {
        const minAge = getMinAgeForGender(formData.gender);
        newErrors.dob = `You must be at least ${minAge} years old and born after 1950`;
      }
    }

    // Marital status validation
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Please select marital status";
    }

    // Religion validation
    if (!formData.religion) {
      newErrors.religion = "Please select religion";
    }

    // Mother tongue validation
    if (!formData.motherTongue) {
      newErrors.motherTongue = "Please select mother tongue";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Please enter your mobile number";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    // Location validation
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state";
    } else if (formData.state.trim().length < 2) {
      newErrors.state = "State name must be at least 2 characters";
    }

    // Education validation
    if (!formData.education) {
      newErrors.education = "Please select education";
    } else if (
      formData.education === "other" &&
      !formData.otherEducation.trim()
    ) {
      newErrors.otherEducation = "Please specify your education";
    } else if (
      formData.education === "other" &&
      formData.otherEducation.trim().length < 3
    ) {
      newErrors.otherEducation = "Education must be at least 3 characters";
    }

    // Occupation validation
    if (!formData.occupation) {
      newErrors.occupation = "Please select occupation";
    } else if (
      formData.occupation === "other" &&
      !formData.otherOccupation.trim()
    ) {
      newErrors.otherOccupation = "Please specify your occupation";
    } else if (
      formData.occupation === "other" &&
      formData.otherOccupation.trim().length < 3
    ) {
      newErrors.otherOccupation = "Occupation must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  // Transform form data to match database schema
  const transformFormDataForAPI = useCallback((data) => {
    // Convert date from DD/MM/YYYY to YYYY-MM-DD
    const dateOfBirth = formatDateForAPI(data.dob);

    // Convert gender to uppercase (MALE, FEMALE, OTHER)
    const genderMap = {
      male: "MALE",
      female: "FEMALE",
      other: "OTHER",
    };
    const gender =
      genderMap[data.gender.toLowerCase()] || data.gender.toUpperCase();

    // Convert marital status to match database schema
    const maritalStatusMap = {
      "never-married": "SINGLE",
      divorced: "DIVORCED",
      widowed: "WIDOWED",
      "awaiting-divorce": "DIVORCED", // Map to DIVORCED as DB doesn't have awaiting-divorce
    };
    const maritalStatus = maritalStatusMap[data.maritalStatus] || "SINGLE";

    // Capitalize religion
    const religion = data.religion
      ? data.religion.charAt(0).toUpperCase() +
        data.religion.slice(1).toLowerCase()
      : null;

    // Convert income range to numeric value (middle of range or null)
    const incomeMap = {
      "0-3": 150000, // 1.5 lakhs (middle of 0-3 range)
      "3-5": 400000, // 4 lakhs
      "5-10": 750000, // 7.5 lakhs
      "10-20": 1500000, // 15 lakhs
      "20-50": 3500000, // 35 lakhs
      "50+": 6000000, // 60 lakhs (estimated)
    };
    const income = data.income ? incomeMap[data.income] || null : null;

    // Handle education - use otherEducation if education is "other"
    const education =
      data.education === "other"
        ? data.otherEducation.trim()
        : data.education
          ? data.education.charAt(0).toUpperCase() +
            data.education.slice(1).toLowerCase()
          : null;

    // Handle occupation - use otherOccupation if occupation is "other"
    const occupation =
      data.occupation === "other"
        ? data.otherOccupation.trim()
        : data.occupation
          ? data.occupation.charAt(0).toUpperCase() +
            data.occupation.slice(1).toLowerCase()
          : null;

    // Capitalize city and state
    const capitalizeWords = (str) => {
      if (!str) return null;
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    };

    return {
      // User table fields
      email: data.email.trim().toLowerCase(),
      password: data.password,
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      phone: data.phone || null,
      role: "USER", // Default role for registration

      // Profile table fields
      date_of_birth: dateOfBirth,
      gender: gender,
      religion: religion,
      caste: data.caste?.trim() || null,
      occupation: occupation,
      education: education,
      income: income,
      marital_status: maritalStatus,
      city: capitalizeWords(data.city),
      state: capitalizeWords(data.state),
      country: capitalizeWords(data.country) || "India",
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    try {
      // Transform form data to match database schema
      const transformedData = transformFormDataForAPI(formData);
      const result = await register(transformedData);
      if (result.success) {
        toast.success("Registration successful! You can now log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const msg =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.strengthLevel) {
      case "weak":
        return "strength-weak";
      case "medium":
        return "strength-medium";
      case "strong":
        return "strength-strong";
      default:
        return "";
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Progress Indicator */}
        <div className="progress-header">
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <span>1</span>
              <p>Account</p>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <span>2</span>
              <p>Profile</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="form-content">
          {currentStep === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h2>Create Your Account</h2>
                <p>Start your journey to find your perfect life partner</p>
              </div>

              <form className="register-form">
                {errors.general && (
                  <div className="error-alert" role="alert">
                    {errors.general}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "error" : ""}
                      placeholder="Enter first name"
                      required
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Enter last name"
                      required
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "error" : ""}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeSlash size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <div className="password-strength">
                    <div
                      className={`strength-bar ${getPasswordStrengthColor()}`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="password-requirements">
                    <p>Password must contain:</p>
                    <ul>
                      {[
                        { key: "lengthCheck", text: "Minimum 8 characters" },
                        { key: "lowerCheck", text: "One lowercase letter" },
                        { key: "upperCheck", text: "One uppercase letter" },
                        { key: "numberCheck", text: "One number" },
                        {
                          key: "specialCheck",
                          text: "One special character (e.g. @ # $ ! ?)",
                        },
                      ].map(({ key, text }) => (
                        <li
                          key={key}
                          className={
                            passwordStrength.results[key] ? "valid" : "invalid"
                          }
                        >
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? "error" : ""}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeSlash size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    <span className="terms-text">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-decoration-none fw-semibold"
                        style={{ color: "var(--primary)" }}
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-decoration-none fw-semibold"
                        style={{ color: "var(--primary)" }}
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <span className="error-message">{errors.terms}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="next-btn"
                  aria-label="Continue to profile information step"
                >
                  Continue to Profile
                </button>

                <div className="login-prompt text-center mt-3">
                  <span>Already have an account? </span>
                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <div className="step-header">
                <h2>Complete Your Profile</h2>
                <p>Help us find your perfect match</p>
              </div>

              <form onSubmit={handleSubmit} className="register-form">
                {errors.general && (
                  <div className="error-alert" role="alert">
                    {errors.general}
                  </div>
                )}

                {/* Profile For */}
                <div className="form-group">
                  <label>I'm creating this profile for</label>
                  <div
                    className="radio-group"
                    role="radiogroup"
                    aria-label="Profile creation purpose"
                  >
                    {PROFILE_FOR_OPTIONS.map(({ value, label }) => (
                      <label key={value} className="radio-option">
                        <input
                          type="radio"
                          name="profileFor"
                          value={value}
                          checked={formData.profileFor === value}
                          onChange={handleInputChange}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div className="form-group">
                  <label htmlFor="gender">
                    Gender <span className="required">*</span>
                  </label>
                  <div
                    className="radio-group"
                    role="radiogroup"
                    aria-label="Gender selection"
                    aria-required="true"
                  >
                    {GENDER_OPTIONS.map(({ value, label }) => (
                      <label key={value} className="radio-option">
                        <input
                          type="radio"
                          name="gender"
                          value={value}
                          checked={formData.gender === value}
                          onChange={handleInputChange}
                          aria-required="true"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <span className="error-message" role="alert">
                      {errors.gender}
                    </span>
                  )}
                </div>

                {/* DOB and Marital Status */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dob">
                      Date of Birth <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={errors.dob ? "error" : ""}
                      placeholder="DD/MM/YYYY"
                      maxLength="10"
                      aria-required="true"
                      aria-describedby={errors.dob ? "dob-error" : "dob-help"}
                      inputMode="numeric"
                    />
                    <div className="help-text" id="dob-help">
                      Format: DD/MM/YYYY (e.g., 15/05/1990)
                    </div>
                    {errors.dob && (
                      <span
                        className="error-message"
                        id="dob-error"
                        role="alert"
                      >
                        {errors.dob}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="maritalStatus">
                      Marital Status <span className="required">*</span>
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className={errors.maritalStatus ? "error" : ""}
                      aria-required="true"
                    >
                      <option value="">Select</option>
                      {MARITAL_STATUS_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.maritalStatus && (
                      <span className="error-message" role="alert">
                        {errors.maritalStatus}
                      </span>
                    )}
                  </div>
                </div>

                {/* Religion and Caste */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="religion">
                      Religion <span className="required">*</span>
                    </label>
                    <select
                      id="religion"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      className={errors.religion ? "error" : ""}
                      aria-required="true"
                    >
                      <option value="">Select Religion</option>
                      <option value="hindu">Hindu</option>
                      <option value="muslim">Muslim</option>
                      <option value="christian">Christian</option>
                      <option value="sikh">Sikh</option>
                      <option value="buddhist">Buddhist</option>
                      <option value="jain">Jain</option>
                      <option value="parsi">Parsi</option>
                      <option value="atheist">Atheist</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.religion && (
                      <span className="error-message" role="alert">
                        {errors.religion}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="caste">Caste</label>
                    <input
                      type="text"
                      id="caste"
                      name="caste"
                      value={formData.caste}
                      onChange={handleInputChange}
                      className={errors.caste ? "error" : ""}
                      placeholder="Enter your caste (optional)"
                    />
                    {errors.caste && (
                      <span className="error-message" role="alert">
                        {errors.caste}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mother Tongue */}
                <div className="form-group">
                  <label htmlFor="motherTongue">
                    Mother Tongue <span className="required">*</span>
                  </label>
                  <select
                    id="motherTongue"
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleInputChange}
                    className={errors.motherTongue ? "error" : ""}
                    aria-required="true"
                  >
                    <option value="">Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="bengali">Bengali</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="kannada">Kannada</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="urdu">Urdu</option>
                    <option value="odia">Odia</option>
                    <option value="assamese">Assamese</option>
                  </select>
                  {errors.motherTongue && (
                    <span className="error-message" role="alert">
                      {errors.motherTongue}
                    </span>
                  )}
                </div>

                {/* Contact Information */}
                <div className="form-group">
                  <label htmlFor="phone">
                    Mobile Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "error" : ""}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    aria-required="true"
                    aria-describedby="phone-help"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                  />
                  <div className="help-text" id="phone-help">
                    10-digit mobile number without country code
                  </div>
                  {errors.phone && (
                    <span className="error-message" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">
                      City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "error" : ""}
                      placeholder="Enter your city"
                      aria-required="true"
                    />
                    {errors.city && (
                      <span className="error-message" role="alert">
                        {errors.city}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">
                      State <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? "error" : ""}
                      placeholder="Enter your state"
                      aria-required="true"
                    />
                    {errors.state && (
                      <span className="error-message" role="alert">
                        {errors.state}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">UAE</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                {/* Education */}
                <div className="form-group">
                  <label htmlFor="education">
                    Highest Education <span className="required">*</span>
                  </label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={errors.education ? "error" : ""}
                    aria-required="true"
                  >
                    <option value="">Select Education</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="doctorate">Doctorate/PhD</option>
                    <option value="diploma">Diploma</option>
                    <option value="high-school">High School</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.education && (
                    <span className="error-message" role="alert">
                      {errors.education}
                    </span>
                  )}

                  {formData.education === "other" && (
                    <div className="other-field">
                      <input
                        type="text"
                        name="otherEducation"
                        value={formData.otherEducation}
                        onChange={handleInputChange}
                        className={errors.otherEducation ? "error" : ""}
                        placeholder="e.g., Professional Certification, Vocational Training"
                        aria-required="true"
                      />
                      {errors.otherEducation && (
                        <span className="error-message" role="alert">
                          {errors.otherEducation}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Occupation */}
                <div className="form-group">
                  <label htmlFor="occupation">
                    Occupation <span className="required">*</span>
                  </label>
                  <select
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className={errors.occupation ? "error" : ""}
                    aria-required="true"
                  >
                    <option value="">Select Occupation</option>
                    <option value="engineer">Engineer</option>
                    <option value="doctor">Doctor</option>
                    <option value="teacher">Teacher</option>
                    <option value="business">Business Owner</option>
                    <option value="government">Government Employee</option>
                    <option value="private">Private Sector</option>
                    <option value="student">Student</option>
                    <option value="homemaker">Homemaker</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.occupation && (
                    <span className="error-message" role="alert">
                      {errors.occupation}
                    </span>
                  )}

                  {formData.occupation === "other" && (
                    <div className="other-field">
                      <input
                        type="text"
                        name="otherOccupation"
                        value={formData.otherOccupation}
                        onChange={handleInputChange}
                        className={errors.otherOccupation ? "error" : ""}
                        placeholder="e.g., Content Creator, Artist, Pilot"
                        aria-required="true"
                      />
                      {errors.otherOccupation && (
                        <span className="error-message" role="alert">
                          {errors.otherOccupation}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Income */}
                <div className="form-group">
                  <label htmlFor="income">Annual Income (Optional)</label>
                  <select
                    id="income"
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Range (Optional)</option>
                    <option value="0-3">Below 3 Lakhs</option>
                    <option value="3-5">3-5 Lakhs</option>
                    <option value="5-10">5-10 Lakhs</option>
                    <option value="10-20">10-20 Lakhs</option>
                    <option value="20-50">20-50 Lakhs</option>
                    <option value="50+">Above 50 Lakhs</option>
                  </select>
                  <div className="help-text">
                    Your income information helps in better matching
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-btn"
                    aria-label="Go back to account creation step"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                    aria-busy={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
