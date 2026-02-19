import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { profileService } from "../../../services/profileService.js";
import "./Dashboard.css";

const FreeEditProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await profileService.getProfile();
      setProfile(data || {});
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileService.updateProfile(profile);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="modern-dashboard">
      <div className="page-header">
        <h1>Edit Profile</h1>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              value={profile.firstName || ""}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              value={profile.lastName || ""}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={profile.dateOfBirth || ""}
              onChange={(e) =>
                setProfile({ ...profile, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={profile.gender || ""}
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Religion</label>
            <input
              className="form-control"
              value={profile.religion || ""}
              onChange={(e) =>
                setProfile({ ...profile, religion: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Caste</label>
            <input
              className="form-control"
              value={profile.caste || ""}
              onChange={(e) =>
                setProfile({ ...profile, caste: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Occupation</label>
            <input
              className="form-control"
              value={profile.occupation || ""}
              onChange={(e) =>
                setProfile({ ...profile, occupation: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Education</label>
            <input
              className="form-control"
              value={profile.education || ""}
              onChange={(e) =>
                setProfile({ ...profile, education: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Income (₹)</label>
            <input
              type="number"
              className="form-control"
              value={profile.income || ""}
              onChange={(e) =>
                setProfile({ ...profile, income: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Marital Status</label>
            <select
              className="form-select"
              value={profile.maritalStatus || "SINGLE"}
              onChange={(e) =>
                setProfile({ ...profile, maritalStatus: e.target.value })
              }
            >
              <option value="SINGLE">Single</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Widowed</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              className="form-control"
              value={profile.heightCm || ""}
              onChange={(e) =>
                setProfile({ ...profile, heightCm: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              value={profile.weightKg || ""}
              onChange={(e) =>
                setProfile({ ...profile, weightKg: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              className="form-control"
              value={profile.city || ""}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">State</label>
            <input
              className="form-control"
              value={profile.state || ""}
              onChange={(e) =>
                setProfile({ ...profile, state: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              value={profile.country || "India"}
              onChange={(e) =>
                setProfile({ ...profile, country: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label className="form-label">About Me</label>
            <textarea
              className="form-control"
              rows="4"
              value={profile.aboutMe || ""}
              onChange={(e) =>
                setProfile({ ...profile, aboutMe: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label className="form-label">Preferences</label>
            <textarea
              className="form-control"
              rows="4"
              value={profile.preferences || ""}
              onChange={(e) =>
                setProfile({ ...profile, preferences: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="btn btn-danger mt-3" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default FreeEditProfile;
