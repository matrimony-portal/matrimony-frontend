// src/components/dashboard/shared/Settings.jsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useTheme } from "../../../hooks/useTheme.jsx";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";
import { SettingItem, ToggleSwitch } from "../../ui";

/**
 * Shared Settings component used across free, premium, and organizer dashboards.
 * Accepts userType prop to customize behavior based on user subscription level.
 */
const Settings = ({ userType = "free" }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { isPremium } = useUserCapabilities();

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

  const handleToggle = useCallback((setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  }, []);

  const handleSelectChange = useCallback((e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  }, []);

  const changePassword = useCallback(() => {
    // TODO: Replace with proper modal/navigation
    alert("Redirecting to change password page...");
  }, []);

  const deactivateAccount = useCallback(() => {
    if (
      window.confirm(
        "Deactivate your account?\n\nYour profile will be hidden but you can reactivate anytime.",
      )
    ) {
      alert("Account deactivated. You can reactivate by logging in again.");
      navigate("/login");
    }
  }, [navigate]);

  const deleteAccount = useCallback(() => {
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
  }, [navigate]);

  // Visibility options vary by user type
  const getVisibilityOptions = () => {
    const baseOptions = [
      { value: "everyone", label: "Everyone" },
      { value: "hidden", label: "Hidden" },
    ];

    if (userType === "premium" || userType === "organizer") {
      baseOptions.splice(1, 0, {
        value: "premium",
        label: "Premium Members Only",
      });
    }

    return baseOptions;
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
              {getVisibilityOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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

      {/* Appearance Settings */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="border-bottom pb-2 mb-3">Appearance</h5>

          <SettingItem
            title="Theme"
            description="Choose your preferred color theme"
          >
            <div className="d-flex gap-2">
              <button
                className={`btn btn-sm ${
                  theme === "default" ? "btn-danger" : "btn-outline-secondary"
                }`}
                onClick={() => toggleTheme("default")}
                style={{ minWidth: "100px" }}
              >
                <i className="bi bi-sun me-2"></i>
                Default
              </button>
              <button
                className={`btn btn-sm ${
                  theme === "dark" ? "btn-danger" : "btn-outline-secondary"
                }`}
                onClick={() => toggleTheme("dark")}
                style={{ minWidth: "100px" }}
              >
                <i className="bi bi-moon me-2"></i>
                Dark
              </button>
            </div>
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

      {/* Subscription Details - Premium Users */}
      {isPremium && userType === "premium" && (
        <div className="card mb-4 border-warning">
          <div className="card-body">
            <h5 className="border-bottom pb-2 mb-3">
              <i className="bi bi-star-fill text-warning me-2"></i>
              Subscription Details
            </h5>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="small text-muted mb-1">Current Plan</div>
                  <div className="h5 mb-0">
                    <span className="badge bg-warning text-dark fs-6">
                      {user?.subscriptionTier === "premium"
                        ? "Gold Plan"
                        : user?.subscriptionTier?.toUpperCase() || "Premium"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="small text-muted mb-1">
                    Subscription Status
                  </div>
                  <div className="h6 mb-0">
                    <span className="badge bg-success">
                      {user?.subscriptionStatus === "active"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              {user?.subscriptionExpiry && (
                <div className="col-12">
                  <div className="p-3 bg-light rounded">
                    <div className="small text-muted mb-1">Expiry Date</div>
                    <div className="h6 mb-0">
                      {new Date(user.subscriptionExpiry).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </div>
                    <div className="small text-muted mt-2">
                      {new Date(user.subscriptionExpiry) > new Date()
                        ? `${Math.ceil(
                            (new Date(user.subscriptionExpiry) - new Date()) /
                              (1000 * 60 * 60 * 24),
                          )} days remaining`
                        : "Expired"}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/dashboard/premium/subscription")}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

Settings.propTypes = {
  userType: PropTypes.oneOf(["free", "premium", "organizer"]),
};

export default Settings;
