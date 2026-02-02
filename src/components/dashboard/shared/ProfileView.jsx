// src/components/dashboard/shared/ProfileView.jsx
import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import { toast } from "../../../utils/toast.js";
import useConfirmation from "../../../hooks/useConfirmation.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

/**
 * ProfileDetailItem - Reusable component for displaying profile details
 */
const ProfileDetailItem = ({ label, value }) => (
  <div className="col-6 col-md-4">
    <div className="p-2 bg-light rounded">
      <div className="small text-muted mb-1">{label}</div>
      <div className="fw-semibold">{value}</div>
    </div>
  </div>
);

ProfileDetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

/**
 * ProfileSection - Reusable component for profile detail sections
 */
const ProfileSection = ({ title, items }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="border-bottom pb-2 mb-3">{title}</h5>
      <div className="row g-3">
        {items.map((item, idx) => (
          <ProfileDetailItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  </div>
);

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

/**
 * Shared ProfileView component used across free and premium dashboards.
 * Displays detailed profile information with actions.
 */
const ProfileView = ({ userType = "free" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const basePath = useDashboardBasePath();
  const { confirm, confirmationProps } = useConfirmation();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // TODO: Replace with API call based on id and profileService
  const profile = {
    id: id || 1,
    name: "Priya Agarwal",
    profileId: "PM245678",
    age: 28,
    height: "5'4\"",
    religion: "Hindu",
    caste: "Brahmin",
    location: "Mumbai, Maharashtra",
    education: "MBA",
    college: "IIM Ahmedabad",
    occupation: "Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    income: "₹15-20 Lakhs",
    photo: "/assets/images/female-profile/priyanka.png",
    isOnline: true,
    respondsIn: "2 hours",
    isPremium: true,
    maritalStatus: "Never Married",
    motherTongue: "Hindi",
    bodyType: "Average",
    complexion: "Fair",
    subCaste: "Not Specified",
    manglik: "No",
    gotra: "Kashyap",
    starSign: "Aries",
    workingCity: "Mumbai",
    familyType: "Nuclear Family",
    familyStatus: "Upper Middle Class",
    fatherOccupation: "Business Owner",
    motherOccupation: "Teacher",
    brothers: "1 (Married)",
    sisters: "None",
    diet: "Vegetarian",
    smoking: "No",
    drinking: "No",
    hobbies: "Reading, Traveling, Yoga",
    phone: "+91 98765-43210",
    email: "priya.a@email.com",
    whatsapp: "Available",
    about: `I am a motivated and ambitious software engineer working with a leading tech company in Mumbai. I completed my MBA from IIM and have been working in the IT industry for the past 5 years. I come from a well-educated and cultured family that values both tradition and modernity.

I enjoy traveling, reading books, and spending quality time with family and friends. I'm passionate about my career but also believe in maintaining a healthy work-life balance. I love cooking traditional Indian cuisine and experimenting with new recipes. Music and dancing are my stress-busters, and I practice yoga regularly to stay fit and healthy.

I'm looking for a life partner who is understanding, supportive, and shares similar values. Someone who respects family traditions while being modern in outlook. Education and career are important, but so is emotional compatibility and mutual respect. I believe in building a relationship based on trust, communication, and shared dreams for the future.`,
    partnerPreferences: `I am looking for a well-educated partner, preferably with a post-graduate degree or equivalent. He should be working in a stable profession and have clear career goals. Age between 28-35 years would be ideal. Height should be above 5'8". I prefer someone from a similar cultural and religious background who respects family values and traditions.

The ideal match should be understanding, supportive, and have a positive outlook on life. He should believe in equality and mutual respect in a relationship. Someone who values both career and family, and is willing to build a life based on trust, love, and companionship. Location preference is Mumbai or other metro cities, but open to relocation for the right match.`,
  };

  const galleryImages = [
    "/assets/images/female-profile/priyanka.png",
    "/assets/images/female-profile/sneha.png",
    "/assets/images/female-profile/ananya.png",
  ];

  const similarProfiles = [
    {
      id: 2,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
      occupation: "Doctor",
      location: "Delhi, India",
      image: "/assets/images/female-profile/sneha.png",
    },
    {
      id: 3,
      name: "Ananya Mehta",
      age: 27,
      height: "5'5\"",
      occupation: "Business Analyst",
      location: "Bangalore, Karnataka",
      image: "/assets/images/female-profile/ananya.png",
    },
    {
      id: 4,
      name: "Neha Reddy",
      age: 29,
      height: "5'6\"",
      occupation: "Marketing Manager",
      location: "Hyderabad, Telangana",
      image: "/assets/images/female-profile/neha.png",
    },
  ];

  const sendProposal = useCallback(() => {
    // TODO: Replace with actual API call
    toast.info(
      `Sending interest to ${profile.name}! You will be notified when they respond.`,
    );
  }, [profile.name]);

  const startChat = useCallback(() => {
    // TODO: Replace with actual API call
    toast.info(`Starting chat with ${profile.name}...`);
    navigate(`${basePath}/messages`);
  }, [profile.name, navigate, basePath]);

  const shortlist = useCallback(() => {
    // TODO: Replace with actual API call
    toast.success(`${profile.name} added to your shortlist!`);
  }, [profile.name]);

  const share = useCallback(() => {
    // TODO: Replace with share modal
    toast.info("Share this profile via: WhatsApp, Email, or Copy Link");
  }, []);

  const report = useCallback(async () => {
    const ok = await confirm({
      title: "Report profile",
      message: "Report this profile? Please provide a reason for reporting.",
      variant: "warning",
    });
    if (ok) {
      toast.success(
        "Thank you for reporting. Our team will review this profile.",
      );
    }
  }, [confirm]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const handleViewSimilarProfile = useCallback(
    (profileId) => {
      navigate(`${basePath}/profile/${profileId}`);
    },
    [navigate, basePath],
  );

  // Define sections – exclude Age, Height, Religion, Location, Education, Occupation
  // (already shown in the profile header) to avoid repetition
  const basicDetails = [
    { label: "Marital Status", value: profile.maritalStatus },
    { label: "Mother Tongue", value: profile.motherTongue },
    { label: "Body Type", value: profile.bodyType },
    { label: "Complexion", value: profile.complexion },
  ];

  const religiousBackground = [
    { label: "Sub Caste", value: profile.subCaste },
    { label: "Manglik", value: profile.manglik },
    { label: "Gotra", value: profile.gotra },
    { label: "Star Sign", value: profile.starSign },
  ];

  const educationCareer = [
    { label: "College/University", value: profile.college },
    { label: "Organization", value: profile.company },
    { label: "Annual Income", value: profile.income },
    { label: "Working City", value: profile.workingCity },
  ];

  const familyDetails = [
    { label: "Family Type", value: profile.familyType },
    { label: "Family Status", value: profile.familyStatus },
    { label: "Father's Occupation", value: profile.fatherOccupation },
    { label: "Mother's Occupation", value: profile.motherOccupation },
    { label: "Brothers", value: profile.brothers },
    { label: "Sisters", value: profile.sisters },
  ];

  const lifestyleHabits = [
    { label: "Diet", value: profile.diet },
    { label: "Smoking", value: profile.smoking },
    { label: "Drinking", value: profile.drinking },
    { label: "Hobbies", value: profile.hobbies },
  ];

  const contactInfo = [
    { icon: "bi-telephone-fill", label: "Phone", value: profile.phone },
    { icon: "bi-envelope-fill", label: "Email", value: profile.email },
    { icon: "bi-whatsapp", label: "WhatsApp", value: profile.whatsapp },
  ];

  return (
    <div className="container-fluid py-3 py-md-4">
      <ConfirmationModal {...confirmationProps} />
      {/* Profile Header */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-3">
            {/* Profile Photo */}
            <div className="col-12 col-md-3 text-center">
              <img
                src={profile.photo}
                alt={profile.name}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "250px" }}
              />
              <span className="badge bg-success mb-2 d-block">
                <i className="bi bi-check-circle-fill me-1"></i>
                Verified Profile
              </span>
            </div>

            {/* Profile Info */}
            <div className="col-12 col-md-6">
              <div className="mb-2">
                <h2 className="h4 mb-2">
                  {profile.name}
                  <i className="bi bi-patch-check-fill text-primary ms-2"></i>
                </h2>
                <p className="text-muted mb-2">ID: {profile.profileId}</p>

                {/* Badges Section */}
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {profile.isOnline && (
                    <span className="badge bg-success text-nowrap">
                      🟢 Online Now
                    </span>
                  )}
                  <span className="badge bg-info text-nowrap">
                    💬 Responds within {profile.respondsIn}
                  </span>
                  {profile.isPremium && (
                    <span className="badge bg-warning text-dark text-nowrap">
                      ⭐ Premium Member
                    </span>
                  )}
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <span className="text-muted small d-block">Age</span>
                  <strong>{profile.age} years</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Height</span>
                  <strong>{profile.height}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Religion</span>
                  <strong>
                    {profile.religion}, {profile.caste}
                  </strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Location</span>
                  <strong>{profile.location}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Education</span>
                  <strong>{profile.education}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Occupation</span>
                  <strong>{profile.occupation}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="col-12 col-md-3">
              <div className="d-grid gap-2">
                <button className="btn btn-danger" onClick={sendProposal}>
                  💌 Send Interest
                </button>
                <button className="btn btn-outline-danger" onClick={startChat}>
                  💬 Start Chat
                </button>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={shortlist}
                    aria-label="Add to shortlist"
                  >
                    ⭐
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={share}
                    aria-label="Share profile"
                  >
                    ↗️
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={report}
                    aria-label="Report profile"
                  >
                    ⚠️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Main Content */}
        <div className="col-12 col-lg-8">
          {/* About */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">About Me</h5>
              <p
                className="text-muted"
                style={{ textAlign: "justify", whiteSpace: "pre-line" }}
              >
                {profile.about}
              </p>
            </div>
          </div>

          <ProfileSection title="Basic Details" items={basicDetails} />
          <ProfileSection
            title="Religious Background"
            items={religiousBackground}
          />
          <ProfileSection title="Education & Career" items={educationCareer} />
          <ProfileSection title="Family Details" items={familyDetails} />
          <ProfileSection title="Lifestyle & Habits" items={lifestyleHabits} />

          {/* Partner Preferences */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">Partner Preferences</h5>
              <p
                className="text-muted"
                style={{ textAlign: "justify", whiteSpace: "pre-line" }}
              >
                {profile.partnerPreferences}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-12 col-lg-4">
          {/* Contact Info */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">Contact Information</h6>
              {contactInfo.map((item, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-center p-2 bg-light rounded mb-2"
                >
                  <i className={`bi ${item.icon} me-3 fs-5`}></i>
                  <div>
                    <div className="small text-muted">{item.label}</div>
                    <div className="fw-semibold small">{item.value}</div>
                  </div>
                </div>
              ))}
              {userType === "free" && (
                <div className="alert alert-warning mb-0 mt-3 small">
                  🔒 Contact details visible to premium members only
                </div>
              )}
            </div>
          </div>

          {/* Similar Profiles */}
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Similar Profiles</h6>
              {similarProfiles.map((similar) => (
                <div
                  key={similar.id}
                  className="d-flex align-items-center gap-2 p-2 mb-2 bg-light rounded"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewSimilarProfile(similar.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleViewSimilarProfile(similar.id)
                  }
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className="rounded"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundImage: `url(${similar.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexShrink: 0,
                    }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="mb-0 small">{similar.name}</h6>
                    <p className="text-muted mb-0 small text-truncate">
                      {similar.age} yrs, {similar.height}, {similar.occupation}
                    </p>
                    <p className="text-muted mb-0 small text-truncate">
                      {similar.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={() => setShowLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowLightbox(false)}
                  aria-label="Close lightbox"
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt="Gallery"
                  className="img-fluid rounded"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
              <div className="modal-footer border-0 justify-content-between">
                <button className="btn btn-light" onClick={prevImage}>
                  ‹ Previous
                </button>
                <button className="btn btn-light" onClick={nextImage}>
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileView.propTypes = {
  userType: PropTypes.oneOf(["free", "premium"]),
  profileService: PropTypes.shape({
    getProfile: PropTypes.func,
    sendProposal: PropTypes.func,
    addToShortlist: PropTypes.func,
  }),
};

export default ProfileView;
