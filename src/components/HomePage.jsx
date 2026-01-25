import { Link, NavLink } from "react-router";
import PropTypes from "prop-types";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./HomePage.css";

// Import images
import image1 from "../assets/images/happy-couple/naeem-ad-qZqjCgYEWl4-unsplash.jpg";
import image2 from "../assets/images/happy-couple/amish-thakkar-REmCdjjUeB8-unsplash.jpg";
import image3 from "../assets/images/happy-couple/arto-suraj-U24mGMjnIIo-unsplash.jpg";
import image4 from "../assets/images/happy-couple/awesome-sauce-creative-uRWekN5S39g-unsplash.jpg";
import image5 from "../assets/images/happy-couple/mohammed-sultan-farooqui-JjOm8445mXw-unsplash.jpg";
import image6 from "../assets/images/happy-couple/monojit-dutta-MU5dYw2pmiY-unsplash.jpg";
import image7 from "../assets/images/happy-couple/alan-morales-NegpLeQFDh4-unsplash.jpg";
import image8 from "../assets/images/happy-couple/picnu-IXJJiTahl_s-unsplash.jpg";
import image9 from "../assets/images/happy-couple/pradeep-potter-cLKTteolrWc-unsplash.jpg";
import image10 from "../assets/images/happy-couple/sagar-shrestha-WNYPL_-8hEc-unsplash.jpg";

const CAROUSEL_DATA = [
  { image: image1, alt: "sweet couple" },
  { image: image2, alt: "sweet couple" },
  { image: image3, alt: "happy couple" },
  { image: image4, alt: "sweet couple" },
  { image: image5, alt: "sweet couple" },
  { image: image6, alt: "sweet couple" },
  { image: image7, alt: "sweet couple" },
  { image: image8, alt: "sweet couple" },
  { image: image9, alt: "sweet couple" },
  { image: image10, alt: "sweet couple" },
];

const STATS_DATA = [
  { value: "2M+", label: "Active Members" },
  { value: "50K+", label: "Success Stories" },
  { value: "500+", label: "Daily Matches" },
  { value: "100%", label: "Verified Profiles" },
];

const FEATURES_DATA = [
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Your data is protected with industry-standard encryption. Complete privacy control over your profile.",
  },
  {
    icon: "✅",
    title: "Verified Profiles",
    description:
      "All profiles are manually verified for authenticity. Meet genuine people looking for serious relationships.",
  },
  {
    icon: "💬",
    title: "Instant Messaging",
    description:
      "Connect instantly with matches through our secure chat system. Start meaningful conversations.",
  },
  {
    icon: "🎯",
    title: "Smart Matching",
    description:
      "Advanced algorithms find compatible matches based on your preferences and interests.",
  },
  {
    icon: "🎉",
    title: "Exclusive Events",
    description:
      "Participate in curated meetup events to meet potential matches in person.",
  },
  {
    icon: "🎧",
    title: "Premium Support",
    description:
      "24/7 customer support to help you throughout your journey to find the perfect match.",
  },
];

const SUCCESS_STATS = [
  { value: "50,000+", label: "Happy Couples" },
  { value: "2,500+", label: "This Year" },
  { value: "95%", label: "Success Rate" },
  { value: "200+", label: "Cities" },
];

const STORIES_DATA = [
  {
    image: "/assets/images/happy-couple/naeem-ad-qZqjCgYEWl4-unsplash.jpg",
    names: "Rahul & Priya",
    location: "Mumbai",
    date: "Oct 2025",
    text: "We found each other on Perfect Match and it's been an incredible journey. The platform made it so easy to connect with like-minded...",
    met: "Speed Dating Event",
    timeToMatch: "2 months",
    badge: "Recent",
  },
  {
    image: "/assets/images/happy-couple/amish-thakkar-REmCdjjUeB8-unsplash.jpg",
    names: "Amit & Sneha",
    location: "Delhi",
    date: "Jan 2025",
    text: "Perfect Match helped us find our soulmates. The verification process ensured we only met genuine people. We're happily...",
    met: "Online Platform",
    timeToMatch: "1 month",
  },
  {
    image: "/assets/images/happy-couple/arto-suraj-U24mGMjnIIo-unsplash.jpg",
    names: "Vikram & Meera",
    location: "Bangalore",
    date: "May 2025",
    text: "The smart matching algorithm of Perfect Match is amazing! We connected instantly and found we had so much in common...",
    met: "Cultural Evening",
    timeToMatch: "6 weeks",
  },
];

const FOOTER_DATA = [
  {
    title: "About Us",
    links: ["Our Story", "How it Works", "Trust & Safety", "Careers"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Help Center", "FAQ", "Report Profile"],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Community Guidelines",
    ],
  },
  {
    title: "Connect",
    links: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
  },
];

const StatItem = ({ value, label }) => (
  <div className="stat-item">
    <h1>{value}</h1>
    <p>{label}</p>
  </div>
);

StatItem.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const StoryCard = ({
  image,
  names,
  location,
  date,
  text,
  met,
  timeToMatch,
  badge,
}) => (
  <div className="story-card">
    <div className="story-image">
      <img src={image} alt={names} />
      {badge && <span className="badge">{badge}</span>}
    </div>
    <h3>{names}</h3>
    <p className="story-meta">
      📍 {location} &nbsp; 💐 Married {date}
    </p>
    <p className="story-text">{text}</p>
    <div className="story-info">
      <p>
        <strong>Met:</strong> {met}
      </p>
      <p>
        <strong>Time to Match:</strong> {timeToMatch}
      </p>
      <p>
        <strong>Status:</strong> Happily Married
      </p>
    </div>
  </div>
);

StoryCard.propTypes = {
  image: PropTypes.string.isRequired,
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  met: PropTypes.string.isRequired,
  timeToMatch: PropTypes.string.isRequired,
  badge: PropTypes.string,
};

const FooterColumn = ({ title, links }) => (
  <div className="footer-column">
    <h4>{title}</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>{link}</li>
      ))}
    </ul>
  </div>
);

FooterColumn.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function HomePage() {
  return (
    <div>
      <Navbar
        expand="lg"
        className="navbar-dark sticky-top shadow"
        style={{
          background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
          padding: "0.5rem 0",
          zIndex: 1030,
          overflow: "visible",
        }}
      >
        <Container
          fluid
          className="px-1 px-md-4 navbar-container"
          style={{
            maxWidth: "100%",
            paddingRight: "0.1rem",
            paddingLeft: "0.5rem",
            overflow: "visible",
          }}
        >
          {/* Logo - Left */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="me-0"
            style={{ flexShrink: 0, minWidth: "auto" }}
          >
            <div className="d-flex align-items-center">
              <img
                src="/assets/logo/logo.svg"
                alt="Logo"
                className="logo-icon"
                style={{ height: "35px", width: "auto" }}
              />
              <img
                src="/assets/logo/bandan.svg"
                alt="Bandan"
                className="d-none d-md-inline"
                style={{ height: "28px", width: "auto", marginLeft: "6px" }}
              />
            </div>
          </Navbar.Brand>

          {/* Action Buttons - Always Visible, Right Side */}
          <div
            className="d-flex align-items-center gap-0 gap-lg-2 ms-lg-auto order-2 order-lg-3 navbar-buttons-container"
            style={{ marginRight: "0", flexShrink: 1, minWidth: 0 }}
          >
            <Button
              as={Link}
              to="/login"
              variant="outline-light"
              size="sm"
              className="px-0 px-sm-1 px-md-3 action-btn-nav"
              style={{
                fontWeight: 500,
                fontSize: "0.65rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                border: "none",
                background: "transparent",
              }}
            >
              <span className="d-none d-sm-inline">Login</span>
              <span className="d-sm-none">Login</span>
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="light"
              size="sm"
              className="px-0 px-sm-1 px-md-3 action-btn-nav"
              style={{
                fontWeight: 500,
                color: "#ae1700",
                fontSize: "0.65rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                background: "white",
              }}
            >
              <span className="d-none d-sm-inline">Register</span>
              <span className="d-sm-none">Reg</span>
            </Button>
            <Button
              as={Link}
              to="/subscription"
              state={{ fromHomepage: true }}
              size="sm"
              className="px-0 px-sm-1 px-md-2 d-flex align-items-center subscribe-btn-nav"
              style={{
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.2) 100%)",
                border: "1.5px solid rgba(255, 193, 7, 0.7)",
                color: "#ffd700",
                fontSize: "0.65rem",
                boxShadow: "0 2px 8px rgba(255, 193, 7, 0.25)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "0.7rem",
                  filter: "drop-shadow(0 1px 2px rgba(255, 193, 7, 0.5))",
                }}
              >
                👑
              </span>
              <span className="d-none d-sm-inline">Subscribe</span>
              <span className="d-sm-none">Sub</span>
            </Button>
          </div>

          {/* Mobile Toggle - Only visible on small screens, positioned on far right */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="d-lg-none order-3"
            style={{
              marginLeft: "0.15rem",
              flexShrink: 0,
              padding: "0.2rem 0.4rem",
              borderWidth: "1px",
            }}
          />

          {/* Navigation Links - Center (Desktop) / Dropdown (Mobile) */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-lg-auto">
              <Nav.Link
                href="#home"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#search"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Search
              </Nav.Link>
              <Nav.Link
                href="#whyUs"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Why us?
              </Nav.Link>
              <Nav.Link
                href="#successStories"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Success Stories
              </Nav.Link>
              {/* <Nav.Link
                href="#events"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Events
              </Nav.Link> */}
              <Nav.Link
                as={Link}
                to="/contact"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="home-happy-couple">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {CAROUSEL_DATA.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="3000"
              >
                <img
                  src={item.image}
                  className="d-block w-100"
                  alt={item.alt}
                />
                <div className="custom-carousel-caption">
                  <h5>Where the love stories begin</h5>
                  <p>Find your perfect match Today</p>
                  <p>
                    Join Thousands of happy couples who found their soulmate
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

          <div className="carousel-indicators">
            {CAROUSEL_DATA.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="home-stats">
        {STATS_DATA.map((stat, index) => (
          <StatItem key={index} value={stat.value} label={stat.label} />
        ))}
      </div>

      <div className="hero-search-section">
        <h1 className="hero-title">Find Your Perfect Life Partner</h1>
        <p className="hero-subtitle">
          Trusted by millions. Join the most successful matrimonial platform.
        </p>

        <section
          className="search-card"
          role="search"
          aria-label="Partner search form"
        >
          <div className="search-row">
            <div className="field">
              <label htmlFor="looking-for">I'm looking for</label>
              <select id="looking-for" aria-describedby="looking-for-help">
                <option>Select</option>
                <option>Man</option>
                <option>Woman</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="age-from">Age</label>
              <select id="age-from" aria-describedby="age-help">
                <option>From</option>
                <option>18</option>
                <option>21</option>
                <option>25</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="age-to">To</label>
              <select id="age-to" aria-describedby="age-help">
                <option>To</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
              </select>
            </div>
          </div>

          <div className="search-row single">
            <div className="field">
              <label htmlFor="religion">Religion</label>
              <select id="religion" aria-describedby="religion-help">
                <option>Any</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
              </select>
            </div>
          </div>

          <button
            className="search-btn"
            type="button"
            aria-label="Search for matches"
          >
            Search Matches
          </button>
        </section>

        <div className="hero-actions">
          <Link to="/register" className="register-btn">
            Register Free
          </Link>
          <Link to="/login" className="login-btn">
            Log In
          </Link>
        </div>
      </div>

      <section className="why-choose-section" id="whyUs">
        <h2 className="section-title">Why Choose Perfect Match?</h2>

        <div className="features-grid" role="list">
          {FEATURES_DATA.map((feature, index) => (
            <div key={index} role="listitem">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="success-stories-section" id="successStories">
        <header className="success-header">
          <h2>💑 Success Stories</h2>
          <p>
            Real couples, real love stories. Your happily ever after starts
            here!
          </p>
        </header>

        <div className="success-stats-card">
          {SUCCESS_STATS.map((stat, index) => (
            <div key={index} className="stat-box">
              <h3>{stat.value}</h3>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stories-cards-section">
        <div className="stories-grid" role="list">
          {STORIES_DATA.map((story, index) => (
            <article key={index} role="listitem">
              <StoryCard
                image={story.image}
                names={story.names}
                location={story.location}
                date={story.date}
                text={story.text}
                met={story.met}
                timeToMatch={story.timeToMatch}
                badge={story.badge}
              />
            </article>
          ))}
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-content">
          {FOOTER_DATA.map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        <div className="footer-divider"></div>

        <p className="footer-bottom">
          © 2025 Perfect Match. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
