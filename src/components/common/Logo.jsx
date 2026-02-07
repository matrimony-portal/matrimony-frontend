import { Link } from "react-router";

const LOGO_STYLES = {
  fontSize: "1.5rem",
  fontWeight: "700",
  letterSpacing: "1px",
  fontFamily: "Georgia, serif",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
};

const Logo = ({ to = "/", size = "md", showText = true }) => {
  const sizes = {
    sm: { icon: "fs-6", text: "fs-6" },
    md: { icon: "fs-4", text: "fs-5" },
    lg: { icon: "fs-2", text: "fs-3" },
  };

  const { icon } = sizes[size] || sizes.md;

  return (
    <Link to={to} className="text-decoration-none d-flex align-items-center">
      <span className={`me-2 ${icon}`}>💍</span>
      {showText && (
        <span className="text-white" style={LOGO_STYLES}>
          Bandhan
        </span>
      )}
    </Link>
  );
};

export default Logo;
