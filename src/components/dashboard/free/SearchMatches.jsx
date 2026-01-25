// src/components/dashboard/free/SearchMatches.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";
import {
  freeUserService,
  jsonDataService,
} from "../../../services/jsonDataService.js";

const SearchMatches = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileViewLimit } = useUserCapabilities();
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allProfiles, setAllProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [profilesViewed, setProfilesViewed] = useState(0);
  const [filters, setFilters] = useState({
    lookingFor: "bride",
    ageFrom: "25",
    ageTo: "30",
    heightFrom: "",
    heightTo: "",
    maritalStatus: "",
    religion: "",
    motherTongue: "",
    country: "india",
    state: "",
    city: "",
    education: "",
    occupation: "",
    income: "",
  });

  const loadTodayViews = useCallback(async () => {
    try {
      const today = new Date();
      const todayViews = await freeUserService.getProfileViews(user?.id, today);
      setProfilesViewed(todayViews.length);
    } catch (error) {
      console.error("Error loading profile views:", error);
    }
  }, [user?.id]);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const profiles = await freeUserService.getProfiles();
      setAllProfiles(profiles);
    } catch (error) {
      console.error("Error loading profiles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load profiles on mount
  useEffect(() => {
    loadProfiles();
    loadTodayViews();
  }, [loadProfiles, loadTodayViews]);

  // Apply filters when filters change
  useEffect(() => {
    if (allProfiles.length > 0) {
      applyFilters();
    }
  }, [filters, allProfiles, applyFilters]);

  // Convert height from "5'4\"" format to numeric (inches)
  const parseHeight = (heightStr) => {
    if (!heightStr) return 0;
    const match = heightStr.match(/(\d+)'(\d+)"/);
    if (match) {
      return parseInt(match[1]) * 12 + parseInt(match[2]);
    }
    // Try numeric format like "5.4" (feet)
    const numeric = parseFloat(heightStr);
    if (!isNaN(numeric)) {
      return Math.round(numeric * 12);
    }
    return 0;
  };

  // Check if income matches range
  const matchesIncomeRange = (profileIncome, incomeFilter) => {
    if (!incomeFilter) return true;
    const income = profileIncome || 0;
    const incomeInLakhs = income / 100000;

    switch (incomeFilter) {
      case "0-3":
        return incomeInLakhs < 3;
      case "3-5":
        return incomeInLakhs >= 3 && incomeInLakhs < 5;
      case "5-10":
        return incomeInLakhs >= 5 && incomeInLakhs < 10;
      case "10-20":
        return incomeInLakhs >= 10 && incomeInLakhs < 20;
      case "20+":
        return incomeInLakhs >= 20;
      default:
        return true;
    }
  };

  // Normalize marital status
  const normalizeMaritalStatus = (status) => {
    if (!status) return "";
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  // Normalize education
  const normalizeEducation = (edu) => {
    if (!edu) return "";
    const lower = edu.toLowerCase();
    if (
      lower.includes("bachelor") ||
      lower.includes("b.tech") ||
      lower.includes("btech")
    ) {
      return "bachelors";
    }
    if (
      lower.includes("master") ||
      lower.includes("mba") ||
      lower.includes("m.tech")
    ) {
      return "masters";
    }
    if (
      lower.includes("doctorate") ||
      lower.includes("phd") ||
      lower.includes("ph.d")
    ) {
      return "doctorate";
    }
    return "";
  };

  // Normalize occupation
  const normalizeOccupation = (occ) => {
    if (!occ) return "";
    const lower = occ.toLowerCase();
    if (
      lower.includes("engineer") ||
      lower.includes("software") ||
      lower.includes("developer")
    ) {
      return "engineer";
    }
    if (
      lower.includes("doctor") ||
      lower.includes("physician") ||
      lower.includes("mbbs")
    ) {
      return "doctor";
    }
    if (
      lower.includes("business") ||
      lower.includes("entrepreneur") ||
      lower.includes("manager")
    ) {
      return "business";
    }
    if (
      lower.includes("teacher") ||
      lower.includes("professor") ||
      lower.includes("educator")
    ) {
      return "teacher";
    }
    return "";
  };

  const applyFilters = useCallback(async () => {
    try {
      // Get blocked users
      const blockedUsers = await freeUserService.getBlockedUsers(user?.id);
      const blockedProfileIds = blockedUsers.map((b) => b.blockedUserId);

      // Get users data to filter by gender
      const users = await jsonDataService.getAll("users");
      const userMap = new Map(users.map((u) => [u.id, u]));

      // Determine target gender
      const targetGender = filters.lookingFor === "bride" ? "female" : "male";

      let filtered = allProfiles.filter((profile) => {
        // Exclude blocked users
        if (blockedProfileIds.includes(profile.userId)) return false;

        // Filter by gender
        const profileUser = userMap.get(profile.userId);
        if (profileUser?.gender !== targetGender) return false;

        // Age filter
        if (filters.ageFrom && profile.age < parseInt(filters.ageFrom))
          return false;
        if (filters.ageTo && profile.age > parseInt(filters.ageTo))
          return false;

        // Height filter
        if (filters.heightFrom || filters.heightTo) {
          const profileHeightInches = parseHeight(profile.height);
          if (filters.heightFrom) {
            const minHeight = parseFloat(filters.heightFrom) * 12;
            if (profileHeightInches < minHeight) return false;
          }
          if (filters.heightTo) {
            const maxHeight = parseFloat(filters.heightTo) * 12;
            if (profileHeightInches > maxHeight) return false;
          }
        }

        // Marital status filter
        if (filters.maritalStatus) {
          const normalizedStatus = normalizeMaritalStatus(
            profile.maritalStatus,
          );
          if (normalizedStatus !== filters.maritalStatus) return false;
        }

        // Religion filter
        if (filters.religion) {
          if (
            profile.religion?.toLowerCase() !== filters.religion.toLowerCase()
          ) {
            return false;
          }
        }

        // State filter
        if (filters.state) {
          if (
            !profile.state?.toLowerCase().includes(filters.state.toLowerCase())
          ) {
            return false;
          }
        }

        // City filter
        if (filters.city) {
          if (
            !profile.city?.toLowerCase().includes(filters.city.toLowerCase())
          ) {
            return false;
          }
        }

        // Education filter
        if (filters.education) {
          const normalizedEdu = normalizeEducation(profile.education);
          if (normalizedEdu !== filters.education) return false;
        }

        // Occupation filter
        if (filters.occupation) {
          const normalizedOcc = normalizeOccupation(profile.occupation);
          if (normalizedOcc !== filters.occupation) return false;
        }

        // Income filter
        if (filters.income) {
          if (!matchesIncomeRange(profile.income, filters.income)) {
            return false;
          }
        }

        return true;
      });

      setFilteredProfiles(filtered);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  }, [allProfiles, filters, user?.id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    applyFilters();
    setShowFilters(false);
  };

  const resetFilters = () => {
    if (window.confirm("Reset all filters to default?")) {
      setFilters({
        lookingFor: "bride",
        ageFrom: "25",
        ageTo: "30",
        heightFrom: "",
        heightTo: "",
        maritalStatus: "",
        religion: "",
        motherTongue: "",
        country: "india",
        state: "",
        city: "",
        education: "",
        occupation: "",
        income: "",
      });
    }
  };

  const handleSendProposal = async (profileName) => {
    const profile = filteredProfiles.find((p) => p.name === profileName);
    if (!profile) return;

    try {
      await freeUserService.sendProposal(user?.id, profile.id);
      await freeUserService.trackActivity(user?.id, "proposal_sent", {
        profileId: profile.id,
        profileName,
      });
      alert(
        `Proposal sent to ${profileName}! You will be notified when they respond.`,
      );
    } catch (error) {
      console.error("Error sending proposal:", error);
      alert("Failed to send proposal. Please try again.");
    }
  };

  const handleViewProfile = async (profileId) => {
    if (profilesViewed >= profileViewLimit) {
      alert(
        "You've reached your daily profile view limit. Upgrade to Premium for unlimited views.",
      );
      return;
    }

    try {
      await freeUserService.trackProfileView(user?.id, profileId);
      await freeUserService.trackActivity(user?.id, "profile_viewed", {
        profileId,
      });
      setProfilesViewed((count) => count + 1);
      navigate(`/dashboard/free/profile/${profileId}`);
    } catch (error) {
      console.error("Error tracking profile view:", error);
      navigate(`/dashboard/free/profile/${profileId}`);
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Header with Filter Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Search Matches</h1>
          <p className="text-muted small mb-0">
            Showing {filteredProfiles.length} of {allProfiles.length} profiles
          </p>
        </div>
        <button
          className="btn btn-danger d-md-none"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="bi bi-funnel me-1"></i>
          Filters
        </button>
      </div>

      <div className="row g-3">
        {/* Filters Sidebar */}
        <div
          className={`col-12 col-md-4 col-lg-3 ${showFilters ? "" : "d-none d-md-block"}`}
        >
          <div className="card sticky-top" style={{ top: "70px" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Search Filters</h5>
                <button
                  className="btn-close d-md-none"
                  onClick={() => setShowFilters(false)}
                ></button>
              </div>

              <div className="mb-3">
                <label className="form-label small">Looking for</label>
                <select
                  className="form-select form-select-sm"
                  name="lookingFor"
                  value={filters.lookingFor}
                  onChange={handleFilterChange}
                >
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Age Range</label>
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="From"
                      name="ageFrom"
                      value={filters.ageFrom}
                      onChange={handleFilterChange}
                      min="18"
                      max="60"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="To"
                      name="ageTo"
                      value={filters.ageTo}
                      onChange={handleFilterChange}
                      min="18"
                      max="60"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small">Height Range</label>
                <div className="row g-2">
                  <div className="col-6">
                    <select
                      className="form-select form-select-sm"
                      name="heightFrom"
                      value={filters.heightFrom}
                      onChange={handleFilterChange}
                    >
                      <option value="">From</option>
                      <option value="5.0">5'0"</option>
                      <option value="5.2">5'2"</option>
                      <option value="5.4">5'4"</option>
                      <option value="5.6">5'6"</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <select
                      className="form-select form-select-sm"
                      name="heightTo"
                      value={filters.heightTo}
                      onChange={handleFilterChange}
                    >
                      <option value="">To</option>
                      <option value="5.6">5'6"</option>
                      <option value="5.8">5'8"</option>
                      <option value="6.0">6'0"</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small">Marital Status</label>
                <select
                  className="form-select form-select-sm"
                  name="maritalStatus"
                  value={filters.maritalStatus}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="never-married">Never Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Religion</label>
                <select
                  className="form-select form-select-sm"
                  name="religion"
                  value={filters.religion}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="hindu">Hindu</option>
                  <option value="muslim">Muslim</option>
                  <option value="christian">Christian</option>
                  <option value="sikh">Sikh</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Mother Tongue</label>
                <select
                  className="form-select form-select-sm"
                  name="motherTongue"
                  value={filters.motherTongue}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                  <option value="bengali">Bengali</option>
                  <option value="tamil">Tamil</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Country</label>
                <select
                  className="form-select form-select-sm"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="canada">Canada</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">State</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter state"
                  name="state"
                  value={filters.state}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small">City</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter city"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small">Education</label>
                <select
                  className="form-select form-select-sm"
                  name="education"
                  value={filters.education}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="bachelors">Bachelor's</option>
                  <option value="masters">Master's</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Occupation</label>
                <select
                  className="form-select form-select-sm"
                  name="occupation"
                  value={filters.occupation}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="engineer">Engineer</option>
                  <option value="doctor">Doctor</option>
                  <option value="business">Business</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Annual Income</label>
                <select
                  className="form-select form-select-sm"
                  name="income"
                  value={filters.income}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="0-3">Below 3 Lakhs</option>
                  <option value="3-5">3-5 Lakhs</option>
                  <option value="5-10">5-10 Lakhs</option>
                  <option value="10-20">10-20 Lakhs</option>
                  <option value="20+">Above 20 Lakhs</option>
                </select>
              </div>

              <button
                className="btn btn-danger w-100 mb-2"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                Reset All
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                <div>
                  <h5 className="mb-0">Search Results</h5>
                  <p className="text-muted small mb-0">
                    Showing {filteredProfiles.length} of {allProfiles.length}{" "}
                    profiles
                  </p>
                </div>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto" }}
                >
                  <option>Recently Active</option>
                  <option>Newest First</option>
                  <option>Age: Low to High</option>
                  <option>Age: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No profiles found matching your criteria. Try adjusting your
                filters.
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {filteredProfiles.map((profile) => (
                <div key={profile.id} className="col-12 col-lg-6">
                  <ProfileCard
                    profile={{
                      ...profile,
                      image:
                        profile.photos?.[0] ||
                        "/assets/images/default-profile.png",
                      location:
                        profile.location || `${profile.city}, ${profile.state}`,
                    }}
                    onSendProposal={handleSendProposal}
                    onViewProfile={() => handleViewProfile(profile.id)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center flex-wrap">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link">4</button>
              </li>
              <li className="page-item">
                <button className="page-link">5</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SearchMatches;
