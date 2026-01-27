import { Outlet } from "react-router";
import { Link } from "react-router";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../../HomePage.css";

/**
 * PublicLayout - Shared layout for public pages (Contact, Subscription, etc.)
 * Includes the homepage navbar for consistent navigation
 */
const PublicLayout = () => {
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
                as={Link}
                to="/"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/#search"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Search
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/#whyUs"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Why us?
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/#successStories"
                className="text-white px-3"
                style={{ fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Success Stories
              </Nav.Link>
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

      {/* Page Content */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
