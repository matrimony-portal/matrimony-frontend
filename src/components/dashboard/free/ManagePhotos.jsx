import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { photoService } from "../../../services/photoService.js";

const FreeManagePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await photoService.getMyPhotos();
      setPhotos(data || []);
    } catch {
      toast.error("Failed to load photos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e, isPrimary = false) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadType(isPrimary ? "primary" : "additional");
    try {
      const uploadedPhoto = await photoService.uploadPhoto(formData, isPrimary);
      toast.success(isPrimary ? "Primary photo uploaded!" : "Photo uploaded!");
      setPhotos((prev) => [...prev, uploadedPhoto]);
      e.target.value = "";
    } catch {
      toast.error("Failed to upload photo");
    } finally {
      setUploading(false);
      setUploadType(null);
    }
  };

  const handleDelete = async (photoId) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      await photoService.deletePhoto(photoId);
      toast.success("Photo deleted");
      setPhotos(photos.filter((p) => p.id !== photoId));
    } catch {
      toast.error("Failed to delete photo");
    }
  };

  const primaryPhoto = photos.find((p) => p.isPrimary);
  const additionalPhotos = photos.filter((p) => !p.isPrimary);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-danger" />
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="h4 mb-3">
            <i className="bi bi-images me-2"></i>
            Manage Photos
          </h2>
          <div className="alert alert-info mb-0">
            <i className="bi bi-info-circle me-2"></i>
            Upload a primary photo (profile picture) and up to 5 additional
            photos. Click any photo to view full size.
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-star-fill text-warning me-2"></i>
                Primary Photo
              </h5>
              {primaryPhoto ? (
                <div className="position-relative">
                  <div
                    className="bg-light rounded p-3 mb-3"
                    style={{
                      minHeight: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setPreviewImage(primaryPhoto.url)}
                  >
                    <img
                      src={primaryPhoto.url}
                      alt="Primary"
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "400px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-danger btn-sm flex-grow-1"
                      onClick={() => handleDelete(primaryPhoto.id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setPreviewImage(primaryPhoto.url)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-5 border border-2 border-dashed rounded bg-light">
                  <i className="bi bi-person-circle display-1 text-muted"></i>
                  <p className="text-muted mt-3 mb-3">
                    No primary photo uploaded
                  </p>
                  <label className="btn btn-danger">
                    {uploading && uploadType === "primary" ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cloud-upload me-2"></i>
                        Upload Primary Photo
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpload(e, true)}
                      hidden
                      disabled={uploading}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  <i className="bi bi-images me-2"></i>
                  Additional Photos
                </h5>
                <span className="badge bg-secondary">
                  {additionalPhotos.length}/5
                </span>
              </div>

              {additionalPhotos.length === 0 ? (
                <div className="text-center p-5 border border-2 border-dashed rounded bg-light">
                  <i className="bi bi-images display-1 text-muted"></i>
                  <p className="text-muted mt-3 mb-3">
                    No additional photos yet
                  </p>
                  {additionalPhotos.length < 5 && (
                    <label className="btn btn-outline-danger">
                      {uploading && uploadType === "additional" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-lg me-2"></i>
                          Add Photo
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUpload(e, false)}
                        hidden
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>
              ) : (
                <>
                  <div className="row g-3 mb-3">
                    {additionalPhotos.map((photo) => (
                      <div key={photo.id} className="col-6">
                        <div className="position-relative">
                          <div
                            className="bg-light rounded p-2"
                            style={{
                              height: "180px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => setPreviewImage(photo.url)}
                          >
                            <img
                              src={photo.url}
                              alt="Additional"
                              className="img-fluid rounded"
                              style={{
                                maxHeight: "160px",
                                maxWidth: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <div className="d-flex gap-1 mt-2">
                            <button
                              className="btn btn-danger btn-sm flex-grow-1"
                              onClick={() => handleDelete(photo.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => setPreviewImage(photo.url)}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {additionalPhotos.length < 5 && (
                    <label className="btn btn-outline-danger w-100">
                      {uploading && uploadType === "additional" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-lg me-2"></i>
                          Add More Photos
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUpload(e, false)}
                        hidden
                        disabled={uploading}
                      />
                    </label>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {previewImage && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0">
              <button
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                style={{ zIndex: 1 }}
                onClick={() => setPreviewImage(null)}
              />
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxHeight: "90vh" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeManagePhotos;
