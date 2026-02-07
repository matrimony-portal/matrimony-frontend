import { Link } from "react-router";

const HeroCarousel = ({ data }) => (
  <div
    id="heroCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
    style={{ height: "calc(100vh - 60px)", minHeight: "500px" }}
  >
    <div className="carousel-inner h-100">
      {data.map((item, index) => (
        <div
          key={index}
          className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}
        >
          <img
            src={item.image}
            className="d-block w-100 h-100"
            alt={item.alt}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="carousel-caption">
            <h5 className="display-6 display-md-4 fw-bold">{item.title}</h5>
            <p className="lead">{item.subtitle}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon"></span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon"></span>
    </button>
  </div>
);

const StatsSection = ({ data }) => (
  <div className="container-fluid py-5 bg-light mb-5">
    <div className="row text-center">
      {data.map((stat, index) => (
        <div key={index} className="col-6 col-md-3 mb-3">
          <h1 className="display-4 fw-bold text-primary">{stat.value}</h1>
          <p className="lead">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const SearchSection = () => (
  <div
    className="py-5 text-white mb-5"
    style={{ background: "linear-gradient(to right, #6e0000, #b30000)" }}
    id="search"
  >
    <div className="container">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Find Your Perfect Life Partner</h1>
        <p className="lead">
          Trusted by millions. Join the most successful matrimonial platform.
        </p>
      </div>

      <div className="card shadow-lg mx-auto" style={{ maxWidth: "800px" }}>
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">I'm looking for</label>
              <select className="form-select">
                <option>Select</option>
                <option>Man</option>
                <option>Woman</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Age From</label>
              <select className="form-select">
                <option>18</option>
                <option>21</option>
                <option>25</option>
                <option>30</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Age To</label>
              <select className="form-select">
                <option>25</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Religion</label>
              <select className="form-select">
                <option>Any</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
              </select>
            </div>
            <div className="col-12 text-center">
              <button className="btn btn-primary btn-lg px-5">
                Search Matches
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/register" className="btn btn-light btn-lg me-3">
          Register Free
        </Link>
        <Link to="/login" className="btn btn-outline-light btn-lg">
          Log In
        </Link>
      </div>
    </div>
  </div>
);

const FeaturesSection = ({ data }) => (
  <div className="container py-5 mb-5" id="features">
    <h2 className="text-center display-5 fw-bold mb-5">Why Choose Bandan?</h2>
    <div className="row g-4">
      {data.map((feature, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card h-100 text-center border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="display-1 mb-3">{feature.icon}</div>
              <h4 className="card-title">{feature.title}</h4>
              <p className="card-text">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SuccessStoriesSection = ({ stats, stories }) => (
  <div className="bg-light py-5 mb-5" id="stories">
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">💑 Success Stories</h2>
        <p className="lead">
          Real couples, real love stories. Your happily ever after starts here!
        </p>
      </div>

      <div className="row text-center mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-3">
            <div className="card border-0 bg-transparent">
              <div className="card-body">
                <h3 className="display-6 fw-bold text-success">{stat.value}</h3>
                <span className="text-muted">{stat.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {stories.map((story, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="position-relative">
                <img
                  src={story.image}
                  className="card-img-top"
                  alt={story.names}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                {story.badge && (
                  <span className="badge bg-success position-absolute top-0 end-0 m-2">
                    {story.badge}
                  </span>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{story.names}</h5>
                <p className="text-muted small">
                  📍 {story.location} &nbsp; 💐 Married {story.date}
                </p>
                <p className="card-text">"{story.text}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-dark text-light py-4" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h5>Contact Us</h5>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="text-light text-decoration-none">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-light text-decoration-none">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-light text-decoration-none">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-light text-decoration-none">
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-3" />
      <p className="text-center mb-0">© 2025 Bandan. All rights reserved.</p>
    </div>
  </footer>
);

export {
  FeaturesSection,
  Footer,
  HeroCarousel,
  SearchSection,
  StatsSection,
  SuccessStoriesSection,
};
