// src/components/dashboard/premium/EditProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Rahul",
    lastName: "Sharma",
    gender: "male",
    dob: "1995-05-15",
    height: "5.6",
    maritalStatus: "never-married",
    religion: "hindu",
    caste: "Brahmin",
    motherTongue: "hindi",
    manglik: "no",
    country: "india",
    state: "Maharashtra",
    city: "Mumbai",
    citizenship: "Indian",
    education: "bachelors",
    college: "Mumbai University",
    occupation: "engineer",
    company: "Tech Solutions Pvt Ltd",
    income: "5-10",
    familyType: "nuclear",
    familyStatus: "middle-class",
    fatherOccupation: "Businessman",
    motherOccupation: "Homemaker",
    brothers: "1",
    sisters: "0",
    diet: "vegetarian",
    smoking: "no",
    drinking: "no",
    aboutMe:
      "I am a software engineer working in Mumbai. I enjoy traveling, reading, and spending time with family. Looking for a life partner who shares similar values and interests.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Save all changes to your profile?")) {
      alert("Profile updated successfully! All changes have been saved.");
      navigate("/dashboard/my-profile");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Discard all changes and go back?")) {
      navigate("/dashboard/my-profile");
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Header Card */}
      <div className="card mb-3 mb-md-4">
        <div className="card-body">
          <div className="row align-items-center g-3">
            {/* Profile Photo */}
            <div className="col-12 col-md-auto text-center">
              <div
                className="rounded-circle mx-auto mb-2"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundImage: "url(../../assets/images/male/rahul.png)",
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
                className="btn btn-sm btn-danger"
                onClick={() => document.getElementById("photoUpload").click()}
              >
                Change Photo
              </button>
            </div>

            {/* Profile Info */}
            <div className="col-12 col-md">
              <h2 className="h4 mb-2">Rahul Agarwal</h2>
              <p className="text-muted mb-2">
                ID: #U1001 | Member since: Jan 2025
              </p>
              <div className="progress mb-2" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="small text-muted mb-0">
                Profile 75% Complete - Add more details to get better matches!
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
                  <option value="5.6">5'6"</option>
                  <option value="5.7">5'7"</option>
                  <option value="5.8">5'8"</option>
                  <option value="5.9">5'9"</option>
                  <option value="5.10">5'10"</option>
                  <option value="5.11">5'11"</option>
                  <option value="6.0">6'0"</option>
                </select>
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
