// src/components/dashboard/premium/SearchMatches.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import ProfileCard from "../../common/shared/ProfileCard.jsx";

const SearchMatches = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    lookingFor: "bride",
    ageFrom: "25",
    ageTo: "30",
    heightFrom: "5.0",
    heightTo: "5.6",
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

  const profiles = [
    {
      id: 1,
      name: "Priya Agarwal",
      age: 28,
      height: "5'4\"",
      education: "MBA",
      occupation: "Software Engineer",
      location: "Mumbai, Maharashtra",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "../../assets/images/female-profile/priyanka.png",
      isOnline: true,
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
      education: "MBBS",
      occupation: "Doctor",
      location: "Delhi, India",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "../../assets/images/female-profile/sneha.png",
      isOnline: false,
    },
    {
      id: 3,
      name: "Ananya Mehta",
      age: 27,
      height: "5'5\"",
      education: "Masters",
      occupation: "Business Analyst",
      location: "Bangalore, Karnataka",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "../../assets/images/female-profile/ananya.png",
      isOnline: true,
    },
    {
      id: 4,
      name: "Neha Reddy",
      age: 29,
      height: "5'6\"",
      education: "MBA",
      occupation: "Marketing Manager",
      location: "Hyderabad, Telangana",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "../../assets/images/female-profile/neha.png",
      isOnline: false,
    },
    {
      id: 5,
      name: "Divya Patel",
      age: 25,
      height: "5'2\"",
      education: "B.Tech",
      occupation: "Teacher",
      location: "Ahmedabad, Gujarat",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "../../assets/images/female-profile/divya.png",
      isOnline: false,
    },
    {
      id: 6,
      name: "Riya Gupta",
      age: 30,
      height: "5'4\"",
      education: "Masters",
      occupation: "Architect",
      location: "Pune, Maharashtra",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "../../assets/images/female-profile/riya.png",
      isOnline: true,
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    alert(
      "Applying search filters... Results will be filtered based on your criteria.",
    );
    setShowFilters(false);
  };

  const resetFilters = () => {
    if (window.confirm("Reset all filters to default?")) {
      setFilters({
        lookingFor: "bride",
        ageFrom: "25",
        ageTo: "30",
        heightFrom: "5.0",
        heightTo: "5.6",
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

  const handleSendProposal = (profileName) => {
    alert(
      `Sending interest to ${profileName}! You will be notified when they respond.`,
    );
  };

  const handleViewProfile = (profileId) => {
    navigate(`/dashboard/profile/${profileId}`);
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Header with Filter Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Search Matches</h1>
          <p className="text-muted small mb-0">Showing 6 of 156 profiles</p>
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
                onClick={applyFilters}
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
                    Showing 6 of 156 profiles
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

          <div className="row g-3">
            {profiles.map((profile) => (
              <div key={profile.id} className="col-12 col-lg-6">
                <ProfileCard
                  profile={profile}
                  onSendProposal={handleSendProposal}
                  onViewProfile={handleViewProfile}
                />
              </div>
            ))}
          </div>

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
