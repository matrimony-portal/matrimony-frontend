// src/components/dashboard/premium/EditProfile.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { profileService } from "../../../services/profileService.js";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import {
  getDefaultFormData,
  apiProfileToFormData,
  formDataToUpdateRequest,
  computeProfileCompletionPercentage,
} from "../../../utils/profileUtils.js";
import { toast } from "../../../utils/toast.js";
import useConfirmation from "../../../hooks/useConfirmation.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const EditProfile = () => {
  const navigate = useNavigate();
  const basePath = useDashboardBasePath();
  const { confirm, confirmationProps } = useConfirmation();
  const [formData, setFormData] = useState(getDefaultFormData);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      setFormData(apiProfileToFormData(data));
    } catch (e) {
      console.error("EditProfile getProfile error:", e);
      toast.error(
        e?.response?.data?.error?.message ||
          e?.response?.data?.message ||
          "Could not load profile.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await confirm({
      title: "Save changes",
      message: "Save all changes to your profile?",
    });
    if (!ok) return;
    try {
      await profileService.updateProfile(formDataToUpdateRequest(formData));
      toast.success(
        "Profile updated successfully! All changes have been saved.",
      );
      navigate(`${basePath}/my-profile`);
    } catch (err) {
      console.error("EditProfile update error:", err);
      toast.error(
        err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          "Could not update profile.",
      );
    }
  };

  const handleCancel = async () => {
    const ok = await confirm({
      title: "Discard changes",
      message: "Discard all changes and go back?",
      variant: "warning",
    });
    if (ok) navigate(`${basePath}/my-profile`);
  };

  const percent = computeProfileCompletionPercentage(formData);
  const displayName =
    [formData.firstName, formData.lastName].filter(Boolean).join(" ") || "—";

  if (loading) {
    return (
      <div className="container-fluid py-3 py-md-4">
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 py-md-4">
      <ConfirmationModal {...confirmationProps} />
      {/* Header Card */}
      <div className="card mb-3 mb-md-4">
        <div className="card-body">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-auto text-center">
              <div
                className="rounded-circle mx-auto mb-2"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundImage: "url(/assets/images/male/rahul.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <input
                type="file"
                id="photoUpload"
                className="d-none"
                accept="image/*"
              />
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => document.getElementById("photoUpload").click()}
              >
                Change Photo
              </button>
            </div>
            <div className="col-12 col-md">
              <h2 className="h4 mb-2">{displayName}</h2>
              <p className="text-muted mb-2">
                Complete your profile to get better matches
              </p>
              <div className="progress mb-2" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="small text-muted mb-0">
                Profile {percent}% complete — add more details to improve your
                matches.
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="h5 border-bottom pb-2 mb-3">Basic Information</h3>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Height <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Height</option>
                  <option value="5.4">5'4"</option>
                  <option value="5.5">5'5"</option>
                  <option value="5.6">5'6"</option>
                  <option value="5.7">5'7"</option>
                  <option value="5.8">5'8"</option>
                  <option value="5.9">5'9"</option>
                  <option value="5.10">5'10"</option>
                  <option value="5.11">5'11"</option>
                  <option value="6.0">6'0"</option>
                  <option value="6.1">6'1"</option>
                  <option value="6.2">6'2"</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="weightKg"
                  value={formData.weightKg}
                  onChange={handleChange}
                  min="20"
                  max="500"
                  placeholder="Optional"
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Marital Status <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="never-married">Never Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="awaiting-divorce">Awaiting Divorce</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Religious Background */}
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="h5 border-bottom pb-2 mb-3">Religious Background</h3>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Religion <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                >
                  <option value="hindu">Hindu</option>
                  <option value="muslim">Muslim</option>
                  <option value="christian">Christian</option>
                  <option value="sikh">Sikh</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="jain">Jain</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Caste/Community</label>
                <input
                  type="text"
                  className="form-control"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Mother Tongue <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  required
                >
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                  <option value="bengali">Bengali</option>
                  <option value="tamil">Tamil</option>
                  <option value="telugu">Telugu</option>
                  <option value="marathi">Marathi</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Manglik</label>
                <select
                  className="form-select"
                  name="manglik"
                  value={formData.manglik}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="anshik">Anshik</option>
                  <option value="dont-know">Don't Know</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="h5 border-bottom pb-2 mb-3">Location Details</h3>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Citizenship</label>
                <input
                  type="text"
                  className="form-control"
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Education & Career */}
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="h5 border-bottom pb-2 mb-3">Education & Career</h3>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Highest Education <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                >
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate/PhD</option>
                  <option value="diploma">Diploma</option>
                  <option value="high-school">High School</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">College/University</label>
                <input
                  type="text"
                  className="form-control"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Occupation <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                >
                  <option value="engineer">Engineer</option>
                  <option value="doctor">Doctor</option>
                  <option value="teacher">Teacher</option>
                  <option value="business">Business Owner</option>
                  <option value="government">Government Employee</option>
                  <option value="private">Private Sector</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">
                  Annual Income <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                >
                  <option value="5-10">5-10 Lakhs</option>
                  <option value="10-20">10-20 Lakhs</option>
                  <option value="20-50">20-50 Lakhs</option>
                  <option value="50+">Above 50 Lakhs</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="h5 border-bottom pb-2 mb-3">About Me</h3>
            <label className="form-label">Write something about yourself</label>
            <textarea
              className="form-control"
              rows="5"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="Tell potential matches about yourself, your interests, hobbies, and what you're looking for in a partner..."
            ></textarea>
            <div className="form-text">Minimum 50 characters</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-danger">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
