import { Link } from "react-router";

const HomePage = () => (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{ background: "var(--gradient)" }}
  >
    <div className="text-center text-white">
      <h1 className="display-4 fw-bold mb-4">Welcome to Bandan</h1>
      <p className="fs-4 mb-5">Your Perfect Match is Just One Click Away</p>
      <div className="d-flex gap-3 justify-content-center">
        <Link
          to="/login"
          className="btn btn-light text-dark px-4 py-3 fw-semibold"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="btn btn-outline-light px-4 py-3 fw-semibold"
        >
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
