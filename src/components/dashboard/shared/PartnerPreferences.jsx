// src/components/dashboard/shared/PartnerPreferences.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { userService } from "../../../services/index.js";
import "../../../styles/PartnerPreferences.css";

// Constants for preference options
const AGE_RANGE = Array.from({ length: 43 }, (_, i) => i + 18); // 18-60

const HEIGHT_OPTIONS = [
  { value: 140, label: "4'7\" (140 cm)" },
  { value: 145, label: "4'9\" (145 cm)" },
  { value: 150, label: "4'11\" (150 cm)" },
  { value: 152, label: "5'0\" (152 cm)" },
  { value: 155, label: "5'1\" (155 cm)" },
  { value: 157, label: "5'2\" (157 cm)" },
  { value: 160, label: "5'3\" (160 cm)" },
  { value: 163, label: "5'4\" (163 cm)" },
  { value: 165, label: "5'5\" (165 cm)" },
  { value: 168, label: "5'6\" (168 cm)" },
  { value: 170, label: "5'7\" (170 cm)" },
  { value: 173, label: "5'8\" (173 cm)" },
  { value: 175, label: "5'9\" (175 cm)" },
  { value: 178, label: "5'10\" (178 cm)" },
  { value: 180, label: "5'11\" (180 cm)" },
  { value: 183, label: "6'0\" (183 cm)" },
  { value: 185, label: "6'1\" (185 cm)" },
  { value: 188, label: "6'2\" (188 cm)" },
  { value: 190, label: "6'3\" (190 cm)" },
  { value: 193, label: "6'4\" (193 cm)" },
  { value: 195, label: "6'5\" (195 cm)" },
];

const RELIGION_OPTIONS = [
  { value: "hindu", label: "Hindu" },
  { value: "muslim", label: "Muslim" },
  { value: "christian", label: "Christian" },
  { value: "sikh", label: "Sikh" },
  { value: "buddhist", label: "Buddhist" },
  { value: "jain", label: "Jain" },
  { value: "parsi", label: "Parsi" },
  { value: "jewish", label: "Jewish" },
  { value: "atheist", label: "Atheist" },
  { value: "other", label: "Other" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "never-married", label: "Never Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "any", label: "Doesn't Matter" },
];

const EDUCATION_OPTIONS = [
  { value: "high-school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate/PhD" },
  { value: "any", label: "Doesn't Matter" },
];

const OCCUPATION_OPTIONS = [
  { value: "engineer", label: "Engineer" },
  { value: "doctor", label: "Doctor" },
  { value: "teacher", label: "Teacher" },
  { value: "business", label: "Business Owner" },
  { value: "government", label: "Government Employee" },
  { value: "private", label: "Private Sector" },
  { value: "self-employed", label: "Self Employed" },
  { value: "any", label: "Doesn't Matter" },
];

const INCOME_OPTIONS = [
  { value: "0-3", label: "Below 3 Lakhs" },
  { value: "3-5", label: "3-5 Lakhs" },
  { value: "5-10", label: "5-10 Lakhs" },
  { value: "10-20", label: "10-20 Lakhs" },
  { value: "20-50", label: "20-50 Lakhs" },
  { value: "50+", label: "Above 50 Lakhs" },
  { value: "any", label: "Doesn't Matter" },
];

const DIET_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "non-vegetarian", label: "Non-Vegetarian" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "any", label: "Doesn't Matter" },
];

const SMOKING_DRINKING_OPTIONS = [
  { value: "no", label: "No" },
  { value: "occasionally", label: "Occasionally" },
  { value: "yes", label: "Yes" },
  { value: "any", label: "Doesn't Matter" },
];

const COUNTRY_OPTIONS = [
  { value: "India", label: "India" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "UAE", label: "UAE" },
  { value: "Singapore", label: "Singapore" },
  { value: "any", label: "Doesn't Matter" },
];

const PartnerPreferences = () => {
  const navigate = useNavigate();
  const { subscriptionTier } = useAuth();
  const isPremium =
    subscriptionTier === "premium" || subscriptionTier === "vip";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Preference state
  const [preferences, setPreferences] = useState({
    // Basic Preferences (Available to all users)
    ageMin: 21,
    ageMax: 35,
    heightMin: 150,
    heightMax: 180,
    maritalStatus: ["never-married"],
    religion: [],
    caste: "",

    // Education & Career
    educationMin: "bachelors",
    occupation: [],
    incomeMin: "any",

    // Location
    country: ["India"],
    state: "",
    city: "",

    // Lifestyle (Premium only)
    diet: "any",
    smoking: "any",
    drinking: "any",

    // Additional Preferences (Premium only)
    manglik: "any",
    motherTongue: [],
    physicalStatus: "any",
  });

  // Load existing preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const profile = await userService.getProfile();
        if (profile.preferences) {
          const savedPrefs =
            typeof profile.preferences === "string"
              ? JSON.parse(profile.preferences)
              : profile.preferences;
          setPreferences((prev) => ({ ...prev, ...savedPrefs }));
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPreferences();
  }, []);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;

      setPreferences((prev) => {
        if (type === "checkbox") {
          const currentValues = prev[name] || [];
          if (checked) {
            return { ...prev, [name]: [...currentValues, value] };
          } else {
            return {
              ...prev,
              [name]: currentValues.filter((v) => v !== value),
            };
          }
        }
        return { ...prev, [name]: value };
      });

      // Clear errors for this field
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors],
  );

  // Handle multi-select changes
  const handleMultiSelect = useCallback((name, value) => {
    setPreferences((prev) => {
      const currentValues = prev[name] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
  }, []);

  // Validate preferences
  const validatePreferences = () => {
    const newErrors = {};

    if (preferences.ageMin > preferences.ageMax) {
      newErrors.age = "Minimum age cannot be greater than maximum age";
    }

    if (preferences.heightMin > preferences.heightMax) {
      newErrors.height = "Minimum height cannot be greater than maximum height";
    }

    if (preferences.religion.length === 0) {
      newErrors.religion = "Please select at least one religion or 'Any'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save preferences
  const handleSave = async () => {
    if (!validatePreferences()) return;

    setSaving(true);
    setSuccessMessage("");

    try {
      await userService.updateProfile({
        preferences: JSON.stringify(preferences),
      });
      setSuccessMessage("Partner preferences saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving preferences:", error);
      setErrors({ general: "Failed to save preferences. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    if (window.confirm("Reset all preferences to default values?")) {
      setPreferences({
        ageMin: 21,
        ageMax: 35,
        heightMin: 150,
        heightMax: 180,
        maritalStatus: ["never-married"],
        religion: [],
        caste: "",
        educationMin: "bachelors",
        occupation: [],
        incomeMin: "any",
        country: ["India"],
        state: "",
        city: "",
        diet: "any",
        smoking: "any",
        drinking: "any",
        manglik: "any",
        motherTongue: [],
        physicalStatus: "any",
      });
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h1 className="h3 mb-2">Partner Preferences</h1>
          <p className="text-muted mb-0">
            Set your ideal match criteria to get better recommendations
          </p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-outline-secondary" onClick={handleReset}>
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Reset
          </button>
          <button
            className="btn btn-danger"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check2 me-2"></i>
                Save Preferences
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage("")}
          ></button>
        </div>
      )}

      {errors.general && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {errors.general}
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrors({})}
          ></button>
        </div>
      )}

      {/* Premium Badge */}
      {!isPremium && (
        <div className="alert alert-info mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-stars text-warning me-3 fs-4"></i>
            <div className="flex-grow-1">
              <strong>Upgrade to Premium</strong> for advanced preferences like
              lifestyle, diet, and more detailed matching criteria.
            </div>
            <button
              className="btn btn-warning btn-sm ms-3"
              onClick={() => navigate("/upgrade")}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Basic Preferences */}
      <div className="card mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-sliders me-2 text-danger"></i>
            Basic Preferences
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {/* Age Range */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-calendar3 me-2"></i>
                Age Range
              </label>
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted">Minimum</label>
                  <select
                    className="form-select"
                    name="ageMin"
                    value={preferences.ageMin}
                    onChange={handleChange}
                  >
                    {AGE_RANGE.map((age) => (
                      <option key={age} value={age}>
                        {age} years
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted">Maximum</label>
                  <select
                    className="form-select"
                    name="ageMax"
                    value={preferences.ageMax}
                    onChange={handleChange}
                  >
                    {AGE_RANGE.map((age) => (
                      <option key={age} value={age}>
                        {age} years
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.age && (
                <div className="text-danger small mt-1">{errors.age}</div>
              )}
            </div>

            {/* Height Range */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-rulers me-2"></i>
                Height Range
              </label>
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted">Minimum</label>
                  <select
                    className="form-select"
                    name="heightMin"
                    value={preferences.heightMin}
                    onChange={handleChange}
                  >
                    {HEIGHT_OPTIONS.map((h) => (
                      <option key={h.value} value={h.value}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted">Maximum</label>
                  <select
                    className="form-select"
                    name="heightMax"
                    value={preferences.heightMax}
                    onChange={handleChange}
                  >
                    {HEIGHT_OPTIONS.map((h) => (
                      <option key={h.value} value={h.value}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.height && (
                <div className="text-danger small mt-1">{errors.height}</div>
              )}
            </div>

            {/* Marital Status */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-heart me-2"></i>
                Marital Status
              </label>
              <div className="preference-chips">
                {MARITAL_STATUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`preference-chip ${preferences.maritalStatus.includes(option.value) ? "active" : ""}`}
                    onClick={() =>
                      handleMultiSelect("maritalStatus", option.value)
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Religion */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-book me-2"></i>
                Religion <span className="text-danger">*</span>
              </label>
              <div className="preference-chips">
                {RELIGION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`preference-chip ${preferences.religion.includes(option.value) ? "active" : ""}`}
                    onClick={() => handleMultiSelect("religion", option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.religion && (
                <div className="text-danger small mt-1">{errors.religion}</div>
              )}
            </div>

            {/* Caste */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-people me-2"></i>
                Caste/Community
              </label>
              <input
                type="text"
                className="form-control"
                name="caste"
                value={preferences.caste}
                onChange={handleChange}
                placeholder="Enter preferred caste (optional)"
              />
              <div className="form-text">
                Leave empty if caste doesn't matter
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Career */}
      <div className="card mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-mortarboard me-2 text-danger"></i>
            Education & Career
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {/* Education */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-award me-2"></i>
                Minimum Education
              </label>
              <select
                className="form-select"
                name="educationMin"
                value={preferences.educationMin}
                onChange={handleChange}
              >
                {EDUCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-briefcase me-2"></i>
                Occupation
              </label>
              <div className="preference-chips">
                {OCCUPATION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`preference-chip ${preferences.occupation.includes(option.value) ? "active" : ""}`}
                    onClick={() =>
                      handleMultiSelect("occupation", option.value)
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Income */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-cash-coin me-2"></i>
                Minimum Annual Income
              </label>
              <select
                className="form-select"
                name="incomeMin"
                value={preferences.incomeMin}
                onChange={handleChange}
              >
                {INCOME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Location Preferences */}
      <div className="card mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-geo-alt me-2 text-danger"></i>
            Location Preferences
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {/* Country */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-globe me-2"></i>
                Country
              </label>
              <div className="preference-chips">
                {COUNTRY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`preference-chip ${preferences.country.includes(option.value) ? "active" : ""}`}
                    onClick={() => handleMultiSelect("country", option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-map me-2"></i>
                State/Province
              </label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={preferences.state}
                onChange={handleChange}
                placeholder="Enter preferred state (optional)"
              />
            </div>

            {/* City */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-building me-2"></i>
                City
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={preferences.city}
                onChange={handleChange}
                placeholder="Enter preferred city (optional)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lifestyle Preferences (Premium Only) */}
      <div className={`card mb-4 ${!isPremium ? "premium-locked" : ""}`}>
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-heart-pulse me-2 text-danger"></i>
            Lifestyle Preferences
          </h5>
          {!isPremium && (
            <span className="badge bg-warning text-dark">
              <i className="bi bi-lock-fill me-1"></i>
              Premium Only
            </span>
          )}
        </div>
        <div className="card-body">
          {!isPremium && (
            <div className="premium-overlay">
              <div className="text-center">
                <i className="bi bi-stars fs-1 text-warning mb-3"></i>
                <h5>Upgrade to Premium</h5>
                <p className="text-muted">
                  Unlock lifestyle preferences for better matching
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/upgrade")}
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
          <div className={`row g-4 ${!isPremium ? "locked-content" : ""}`}>
            {/* Diet */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-egg-fried me-2"></i>
                Diet Preference
              </label>
              <select
                className="form-select"
                name="diet"
                value={preferences.diet}
                onChange={handleChange}
                disabled={!isPremium}
              >
                {DIET_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Smoking */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-lungs me-2"></i>
                Smoking
              </label>
              <select
                className="form-select"
                name="smoking"
                value={preferences.smoking}
                onChange={handleChange}
                disabled={!isPremium}
              >
                {SMOKING_DRINKING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Drinking */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-cup-straw me-2"></i>
                Drinking
              </label>
              <select
                className="form-select"
                name="drinking"
                value={preferences.drinking}
                onChange={handleChange}
                disabled={!isPremium}
              >
                {SMOKING_DRINKING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Manglik */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-star me-2"></i>
                Manglik Status
              </label>
              <select
                className="form-select"
                name="manglik"
                value={preferences.manglik}
                onChange={handleChange}
                disabled={!isPremium}
              >
                <option value="any">Doesn't Matter</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset to Default
              </button>
              <button
                className="btn btn-danger"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-2"></i>
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="card mt-4 border-info">
        <div className="card-body">
          <div className="d-flex align-items-start">
            <i className="bi bi-lightbulb-fill text-info fs-3 me-3"></i>
            <div>
              <h5 className="text-info mb-2">Tips for Better Matches</h5>
              <ul className="mb-0 ps-3">
                <li className="mb-1">
                  Keep age and height ranges flexible for more matches
                </li>
                <li className="mb-1">
                  Select multiple religions if you're open to different
                  backgrounds
                </li>
                <li className="mb-1">
                  Leave caste empty if community doesn't matter to you
                </li>
                <li className="mb-1">
                  Update preferences regularly based on your interactions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPreferences;
