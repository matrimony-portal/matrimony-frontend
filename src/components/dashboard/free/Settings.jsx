// src/components/dashboard/premium/Settings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingItem = ({ title, description, children }) => (
  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-2">
    <div className="flex-grow-1 me-3">
      <h6 className="mb-1">{title}</h6>
      <small className="text-muted">{description}</small>
    </div>
    {children}
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ width: "3rem", height: "1.5rem", cursor: "pointer" }}
    />
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    profileVisibility: "everyone",
    showContact: true,
    showLastSeen: true,
    allowPhotoDownload: false,
    emailNotifications: true,
    smsNotifications: true,
    newMatchAlerts: true,
    proposalAlerts: true,
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const changePassword = () => {
    alert("Redirecting to change password page...");
  };

  const deactivateAccount = () => {
    if (
      window.confirm(
        "Deactivate your account?\n\nYour profile will be hidden but you can reactivate anytime.",
      )
    ) {
      alert("Account deactivated. You can reactivate by logging in again.");
      navigate("/login");
    }
  };

  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to DELETE your account?\n\nThis action cannot be undone!",
      )
    ) {
      if (
        window.confirm("Final confirmation: Delete all your data permanently?")
      ) {
        alert(
          "Account deletion initiated. You will receive a confirmation email.",
        );
        navigate("/login");
      }
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <h1 className="h3 mb-4">Settings</h1>

      {/* Privacy Settings */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="border-bottom pb-2 mb-3">Privacy Settings</h5>

          <SettingItem
            title="Profile Visibility"
            description="Control who can see your profile"
          >
            <select
              className="form-select form-select-sm"
              name="profileVisibility"
              value={settings.profileVisibility}
              onChange={handleSelectChange}
              style={{ width: "auto" }}
            >
              <option value="everyone">Everyone</option>
              <option value="premium">Premium Members Only</option>
              <option value="hidden">Hidden</option>
            </select>
          </SettingItem>

          <SettingItem
            title="Show Contact Details"
            description="Display phone and email on profile"
          >
            <ToggleSwitch
              checked={settings.showContact}
              onChange={() => handleToggle("showContact")}
            />
          </SettingItem>

          <SettingItem
            title="Show Last Seen"
            description="Let others see when you were last active"
          >
            <ToggleSwitch
              checked={settings.showLastSeen}
              onChange={() => handleToggle("showLastSeen")}
            />
          </SettingItem>

          <SettingItem
            title="Allow Photo Download"
            description="Let others download your photos"
          >
            <ToggleSwitch
              checked={settings.allowPhotoDownload}
              onChange={() => handleToggle("allowPhotoDownload")}
            />
          </SettingItem>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="border-bottom pb-2 mb-3">Notification Settings</h5>

          <SettingItem
            title="Email Notifications"
            description="Receive updates via email"
          >
            <ToggleSwitch
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
          </SettingItem>

          <SettingItem
            title="SMS Notifications"
            description="Receive SMS for important updates"
          >
            <ToggleSwitch
              checked={settings.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />
          </SettingItem>

          <SettingItem
            title="New Match Alerts"
            description="Get notified when you receive new matches"
          >
            <ToggleSwitch
              checked={settings.newMatchAlerts}
              onChange={() => handleToggle("newMatchAlerts")}
            />
          </SettingItem>

          <SettingItem
            title="Proposal Alerts"
            description="Notify when someone sends you interest"
          >
            <ToggleSwitch
              checked={settings.proposalAlerts}
              onChange={() => handleToggle("proposalAlerts")}
            />
          </SettingItem>
        </div>
      </div>

      {/* Account Security */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="border-bottom pb-2 mb-3">Account Security</h5>

          <SettingItem
            title="Change Password"
            description="Update your account password"
          >
            <button className="btn btn-danger btn-sm" onClick={changePassword}>
              Change
            </button>
          </SettingItem>

          <SettingItem
            title="Two-Factor Authentication"
            description="Add extra security to your account"
          >
            <ToggleSwitch
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle("twoFactorAuth")}
            />
          </SettingItem>

          <SettingItem
            title="Login Alerts"
            description="Get notified of new login attempts"
          >
            <ToggleSwitch
              checked={settings.loginAlerts}
              onChange={() => handleToggle("loginAlerts")}
            />
          </SettingItem>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-danger">
        <div className="card-body">
          <h5 className="text-danger border-bottom pb-2 mb-3">Danger Zone</h5>

          <SettingItem
            title="Deactivate Account"
            description="Temporarily hide your profile"
          >
            <button
              className="btn btn-warning btn-sm"
              onClick={deactivateAccount}
            >
              Deactivate
            </button>
          </SettingItem>

          <SettingItem
            title="Delete Account"
            description="Permanently delete your account and data"
          >
            <button className="btn btn-danger btn-sm" onClick={deleteAccount}>
              Delete
            </button>
          </SettingItem>
        </div>
      </div>
    </div>
  );
};

export default Settings;
