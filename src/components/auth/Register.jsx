import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  validateEmail,
  validatePhone,
  validateName,
  validatePassword,
  checkPasswordStrength,
  validateAgeAgainstGender,
} from "../../utils/validation.js";
import "../../styles/Register.css";

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
    motherTongue: "",
    phone: "",
    city: "",
    state: "",
    country: "india",
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

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
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

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }
    if (!formData.dob) {
      newErrors.dob = "Please enter your date of birth";
    } else if (!validateAgeAgainstGender(formData.dob)) {
      newErrors.dob =
        "You must be at least 18 years old. Use DD/MM/YYYY format.";
    }
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Please select marital status";
    }
    if (!formData.religion) {
      newErrors.religion = "Please select religion";
    }
    if (!formData.motherTongue) {
      newErrors.motherTongue = "Please select mother tongue";
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city";
    }
    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state";
    }
    if (!formData.education) {
      newErrors.education = "Please select education";
    }
    if (formData.education === "other" && !formData.otherEducation.trim()) {
      newErrors.otherEducation = "Please specify your education";
    }
    if (!formData.occupation) {
      newErrors.occupation = "Please select occupation";
    }
    if (formData.occupation === "other" && !formData.otherOccupation.trim()) {
      newErrors.otherOccupation = "Please specify your occupation";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        alert(
          "Registration successful! Please check your email for verification.",
        );
        navigate("/login");
      }
    } catch {
      setErrors({ general: "Registration failed. Please try again." });
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
          <div className="brand-logo">
            <img
              src="/assets/logo/logo-black.svg"
              alt="Logo"
              className="logo-icon"
            />
            <img
              src="/assets/logo/bandan-black.svg"
              alt="Bandan"
              className="logo-text"
            />
          </div>
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
                  <div className="error-alert">{errors.general}</div>
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
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? "error" : ""}
                    placeholder="Enter your password"
                    required
                  />
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
                          text: "One special character (@$!%*?&)",
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
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? "error" : ""}
                    placeholder="Confirm your password"
                    required
                  />
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
                    <span className="checkmark"></span>I agree to the{" "}
                    <Link to="/terms">Terms and Conditions</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>
                  </label>
                  {errors.terms && (
                    <span className="error-message">{errors.terms}</span>
                  )}
                </div>

                <button type="button" onClick={handleNext} className="next-btn">
                  Continue to Profile
                </button>

                <div className="login-prompt">
                  <span>Already have an account? </span>
                  <Link to="/login">Login here</Link>
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
                  <div className="error-alert">{errors.general}</div>
                )}

                {/* Profile For */}
                <div className="form-group">
                  <label>I'm creating this profile for</label>
                  <div className="radio-group">
                    {[
                      { value: "self", label: "Myself" },
                      { value: "son", label: "Son" },
                      { value: "daughter", label: "Daughter" },
                      { value: "sibling", label: "Sibling" },
                      { value: "relative", label: "Relative" },
                    ].map(({ value, label }) => (
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
                  <label>Gender</label>
                  <div className="radio-group">
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ].map(({ value, label }) => (
                      <label key={value} className="radio-option">
                        <input
                          type="radio"
                          name="gender"
                          value={value}
                          checked={formData.gender === value}
                          onChange={handleInputChange}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <span className="error-message">{errors.gender}</span>
                  )}
                </div>

                {/* DOB and Marital Status */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={errors.dob ? "error" : ""}
                      placeholder="DD/MM/YYYY"
                    />
                    {errors.dob && (
                      <span className="error-message">{errors.dob}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className={errors.maritalStatus ? "error" : ""}
                    >
                      <option value="">Select</option>
                      <option value="never-married">Never Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                      <option value="awaiting-divorce">Awaiting Divorce</option>
                    </select>
                    {errors.maritalStatus && (
                      <span className="error-message">
                        {errors.maritalStatus}
                      </span>
                    )}
                  </div>
                </div>

                {/* Religion and Mother Tongue */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <select
                      id="religion"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      className={errors.religion ? "error" : ""}
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
                      <span className="error-message">{errors.religion}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="motherTongue">Mother Tongue</label>
                    <select
                      id="motherTongue"
                      name="motherTongue"
                      value={formData.motherTongue}
                      onChange={handleInputChange}
                      className={errors.motherTongue ? "error" : ""}
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
                    </select>
                    {errors.motherTongue && (
                      <span className="error-message">
                        {errors.motherTongue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="form-group">
                  <label htmlFor="phone">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "error" : ""}
                    placeholder="10-digit mobile number"
                  />
                  <div className="help-text">
                    10-digit mobile number without country code
                  </div>
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                {/* Location */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "error" : ""}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <span className="error-message">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? "error" : ""}
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <span className="error-message">{errors.state}</span>
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
                    <option value="india">India</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="uae">UAE</option>
                    <option value="singapore">Singapore</option>
                  </select>
                </div>

                {/* Education */}
                <div className="form-group">
                  <label htmlFor="education">Highest Education</label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={errors.education ? "error" : ""}
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
                    <span className="error-message">{errors.education}</span>
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
                      />
                      {errors.otherEducation && (
                        <span className="error-message">
                          {errors.otherEducation}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Occupation */}
                <div className="form-group">
                  <label htmlFor="occupation">Occupation</label>
                  <select
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className={errors.occupation ? "error" : ""}
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
                    <span className="error-message">{errors.occupation}</span>
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
                      />
                      {errors.otherOccupation && (
                        <span className="error-message">
                          {errors.otherOccupation}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Income */}
                <div className="form-group">
                  <label htmlFor="income">Annual Income</label>
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
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-btn"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
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
