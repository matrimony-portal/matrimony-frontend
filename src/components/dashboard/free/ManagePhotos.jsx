// src/components/dashboard/premium/ManagePhotos.jsx
import React, { useState } from "react";

const ManagePhotos = () => {
  const [photos, setPhotos] = useState([
    { id: 1, url: "../../assets/images/male/rahul.png", isProfile: true },
    { id: 2, url: "../../assets/images/male/rahul-p1.png", isProfile: false },
    { id: 3, url: "../../assets/images/male/rahul-p2.png", isProfile: false },
    { id: 4, url: "../../assets/images/male/rahul-p3.png", isProfile: false },
    { id: 5, url: "../../assets/images/male/rahul-p4.png", isProfile: false },
    { id: 6, url: "../../assets/images/male/rahul-p5.png", isProfile: false },
  ]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      alert(
        `Uploading ${files.length} photo(s)... Photos will be reviewed within 24 hours.`,
      );
    }
  };

  const makeProfilePhoto = (id) => {
    setPhotos(
      photos.map((photo) => ({
        ...photo,
        isProfile: photo.id === id,
      })),
    );
    alert("Photo set as profile picture!");
  };

  const deletePhoto = (id) => {
    if (window.confirm("Delete this photo?")) {
      setPhotos(photos.filter((photo) => photo.id !== id));
      alert("Photo deleted successfully!");
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="card mb-3 mb-md-4">
        <div className="card-body text-center">
          <h1 className="h3 mb-2">📸 Manage Your Photos</h1>
          <p className="text-muted mb-0">
            Upload up to 10 photos to make your profile more attractive
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="alert alert-warning mb-3 mb-md-4">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <strong>Important:</strong> Profiles with photos get 10x more responses!
        Make sure to add clear, recent photos.
      </div>

      {/* Upload Section */}
      <div className="card mb-3 mb-md-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Upload New Photos</h3>
          <div
            className="border-3 border-dashed rounded p-4 p-md-5 text-center"
            style={{
              borderStyle: "dashed",
              borderColor: "#cbd5e0",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => document.getElementById("photoInput").click()}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ae1700";
              e.currentTarget.style.backgroundColor = "#f0f4ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e0";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div className="mb-3" style={{ fontSize: "3rem" }}>
              📤
            </div>
            <h4 className="mb-2">Click or Drag to Upload</h4>
            <p className="text-muted mb-3">
              Supported formats: JPG, PNG (Max 5MB)
            </p>
            <input
              type="file"
              id="photoInput"
              className="d-none"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
            />
            <button className="btn btn-danger">Choose Photos</button>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <h3 className="h5 mb-3">Your Photos ({photos.length}/10)</h3>
      <div className="row g-3 g-md-4">
        {photos.map((photo) => (
          <div key={photo.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <div
                className="position-relative"
                style={{
                  paddingTop: "100%",
                  backgroundImage: `url(${photo.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                {photo.isProfile && (
                  <span
                    className="badge bg-success position-absolute top-0 start-0 m-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Profile Photo
                  </span>
                )}
              </div>
              <div className="card-body p-2">
                <div className="d-flex flex-column gap-1">
                  {!photo.isProfile && (
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => makeProfilePhoto(photo.id)}
                    >
                      Set as Profile
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger w-100"
                    onClick={() => deletePhoto(photo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="card mt-3 mt-md-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Photo Guidelines</h3>
          <ul className="mb-0">
            <li>Use recent photos (taken within last 6 months)</li>
            <li>Ensure photos are clear and well-lit</li>
            <li>At least one photo should show your face clearly</li>
            <li>Avoid group photos or photos with others</li>
            <li>No sunglasses or face coverings</li>
            <li>Professional attire photos are recommended</li>
            <li>Inappropriate photos will be rejected during verification</li>
            <li>Photos with watermarks or logos will not be accepted</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePhotos;
