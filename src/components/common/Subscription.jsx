import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
  Table,
  Modal,
  Nav,
} from "react-bootstrap";
import {
  Star,
  StarFill,
  Check,
  X,
  CreditCard,
  Phone,
  PhoneFill,
  Wallet,
  Lock,
  ArrowLeft,
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useUserCapabilities } from "../../hooks/useUserCapabilities.jsx";

// Payment/Subscription Component
const PaymentPage = ({ inLayout = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isFree } = useUserCapabilities();
  const fromHomepage =
    location.state?.fromHomepage || (!inLayout && !isAuthenticated());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const plans = {
    gold: {
      name: "Gold",
      price: 2999,
      duration: "3 months",
      popular: true,
      features: [
        "Unlimited Profile Browsing",
        "Unlimited Proposals",
        "Advanced Search Filters",
        "Direct Chat Feature",
        "View Contact Details",
        "Priority Customer Support",
        "Profile Highlighting",
        "Attend 3 Events Free",
      ],
    },
  };

  const handlePlanSelect = (planKey) => {
    setSelectedPlan(plans[planKey]);
    setShowCheckout(true);
  };

  const applyPromo = () => {
    const validCodes = { SAVE20: 20, FIRST50: 50, PREMIUM10: 10 };
    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      alert(
        `Promo code applied! You saved ₹${Math.round((selectedPlan.price * validCodes[promoCode.toUpperCase()]) / 100)}`,
      );
    } else {
      alert("Invalid promo code!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const calculateTotal = () => {
    if (!selectedPlan) return { subtotal: 0, gst: 0, total: 0 };
    const subtotal =
      selectedPlan.price - Math.round((selectedPlan.price * discount) / 100);
    const gst = Math.round(subtotal * 0.18);
    return { subtotal, gst, total: subtotal + gst };
  };

  const { total } = calculateTotal();

  return (
    <div
      style={{
        minHeight: inLayout ? "auto" : "100vh",
        background: inLayout ? "transparent" : "#f8f9fa",
        width: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Back Button - show when coming from homepage or not in layout */}
      {fromHomepage && !inLayout && (
        <Container className="pt-3">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-decoration-none d-flex align-items-center gap-2 mb-3"
            style={{ color: "#ae1700", padding: 0 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Homepage</span>
          </Button>
        </Container>
      )}

      <div
        style={{
          background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
          color: "white",
          padding: inLayout ? "3rem 0" : "5rem 0",
          textAlign: "center",
          width: "100%",
          marginBottom: inLayout ? "2rem" : "3rem",
        }}
      >
        <Container>
          <h1
            style={{
              fontSize: inLayout ? "2rem" : "2.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            ✨ Unlock Premium Features
          </h1>
          <p
            style={{
              fontSize: inLayout ? "1.1rem" : "1.25rem",
              color: "white",
              opacity: 0.95,
            }}
          >
            Find your perfect match faster with our premium plans
          </p>
        </Container>
      </div>

      <Container
        className="mb-5"
        style={{ maxWidth: "1200px", padding: inLayout ? "0" : "0 15px" }}
      >
        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card
              className="h-100 shadow-sm"
              style={{
                border: "1px solid #e0e0e0",
                backgroundColor: "#ffffff",
              }}
            >
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title
                  className="h3 mb-3"
                  style={{ fontWeight: "bold", color: "#000" }}
                >
                  Basic
                </Card.Title>
                <div
                  className="display-4 fw-bold text-danger mb-2"
                  style={{ fontSize: "3rem" }}
                >
                  Free
                </div>
                <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>
                  Forever
                </p>
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {[
                    "Create Profile",
                    "Browse 10 Profiles/Day",
                    "Send 5 Proposals/Month",
                    "Basic Search Filters",
                    "Email Support",
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="mb-2"
                      style={{ color: "#333", fontSize: "1rem" }}
                    >
                      <Check className="text-success me-2" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={isFree ? "secondary" : "danger"}
                  size="lg"
                  onClick={() => {
                    if (isFree) {
                      alert(
                        "You are currently on the Free plan. Upgrade to Premium to unlock more features!",
                      );
                      window.location.reload();
                    } else {
                      navigate("/register");
                    }
                  }}
                  className="mt-auto"
                >
                  {isFree ? "Current Plan" : "Choose Free"}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              className="h-100 shadow position-relative"
              style={{
                border: "1px solid #e0e0e0",
                backgroundColor: "#ffffff",
              }}
            >
              <Badge
                bg="danger"
                className="position-absolute top-0 end-0 m-2 px-3 py-2"
                style={{
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                }}
              >
                ⭐ Most Popular
              </Badge>
              <Card.Body className="d-flex flex-column p-4 pt-5">
                <Card.Title
                  className="h3 mb-3"
                  style={{ fontWeight: "bold", color: "#000" }}
                >
                  Gold
                </Card.Title>
                <div
                  className="display-4 fw-bold text-danger mb-2"
                  style={{ fontSize: "3rem" }}
                >
                  ₹2,999
                  <span
                    className="fs-5 text-muted"
                    style={{ fontSize: "1.25rem !important" }}
                  >
                    /3 months
                  </span>
                </div>
                <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>
                  Save 33%
                </p>
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {plans.gold.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="mb-2"
                      style={{ color: "#333", fontSize: "1rem" }}
                    >
                      <Check className="text-success me-2" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => handlePlanSelect("gold")}
                  className="mt-auto"
                >
                  Choose Gold
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {showCheckout && selectedPlan && (
          <Card className="shadow mb-4">
            <Card.Body>
              <h2 className="mb-4 pb-3 border-bottom border-danger border-2">
                Complete Your Purchase
              </h2>
              <Row>
                <Col lg={8}>
                  <Form onSubmit={handleSubmit}>
                    <h4 className="mb-3">Contact Information</h4>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control type="text" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control type="email" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone *</Form.Label>
                          <Form.Control
                            type="tel"
                            pattern="[0-9]{10}"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h4 className="mb-3 mt-4">Payment Method</h4>
                    <Row className="g-3 mb-4">
                      {[
                        {
                          value: "card",
                          icon: <CreditCard size={32} />,
                          label: "Credit/Debit Card",
                        },
                        {
                          value: "upi",
                          icon: <PhoneFill size={32} />,
                          label: "UPI",
                        },
                        {
                          value: "netbanking",
                          icon: <Phone size={32} />,
                          label: "Net Banking",
                        },
                        {
                          value: "wallet",
                          icon: <Wallet size={32} />,
                          label: "Wallets",
                        },
                      ].map((method) => (
                        <Col md={6} lg={3} key={method.value}>
                          <Card
                            className={`text-center p-3 cursor-pointer ${paymentMethod === method.value ? "border-danger border-2 bg-light" : ""}`}
                            onClick={() => setPaymentMethod(method.value)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="text-danger mb-2">
                              {method.icon}
                            </div>
                            <small>{method.label}</small>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    {paymentMethod === "card" && (
                      <>
                        <h4 className="mb-3">Card Details</h4>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                        </Form.Group>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Expiry Date *</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                maxLength="5"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>CVV *</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="123"
                                maxLength="3"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}

                    {paymentMethod === "upi" && (
                      <>
                        <h4 className="mb-3">UPI Details</h4>
                        <Form.Group className="mb-3">
                          <Form.Label>UPI ID *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="yourname@upi"
                          />
                        </Form.Group>
                      </>
                    )}

                    <Form.Check
                      type="checkbox"
                      label={
                        <span>
                          I agree to the{" "}
                          <a href="#" className="text-danger">
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-danger">
                            Privacy Policy
                          </a>
                        </span>
                      }
                      required
                      className="my-4"
                    />

                    <Button
                      type="submit"
                      variant="danger"
                      size="lg"
                      className="w-100"
                    >
                      Complete Payment
                    </Button>
                  </Form>
                </Col>

                <Col lg={4}>
                  <Card
                    className="bg-light sticky-top"
                    style={{ top: "100px" }}
                  >
                    <Card.Body>
                      <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                        Order Summary
                      </h5>
                      <Badge bg="success" className="mb-3">
                        {selectedPlan.name} Plan
                      </Badge>

                      <div className="d-flex justify-content-between mb-2">
                        <span>Plan</span>
                        <span>{selectedPlan.name}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Duration</span>
                        <span>{selectedPlan.duration}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>₹{selectedPlan.price.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span>GST (18%)</span>
                        <span>
                          ₹
                          {Math.round(
                            selectedPlan.price * 0.18,
                          ).toLocaleString()}
                        </span>
                      </div>

                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button variant="danger" onClick={applyPromo}>
                          Apply
                        </Button>
                      </InputGroup>

                      {discount > 0 && (
                        <div className="d-flex justify-content-between mb-2 text-success">
                          <span>Discount</span>
                          <span>
                            -₹
                            {Math.round(
                              (selectedPlan.price * discount) / 100,
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="d-flex justify-content-between mb-3 pt-3 border-top fw-bold fs-5">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>

                      <ul className="list-unstyled small mb-3">
                        {selectedPlan.features.map((feature, idx) => (
                          <li key={idx} className="mb-1">
                            <Check className="text-success me-1" size={12} />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="d-flex gap-2 flex-wrap pt-3 border-top small text-muted">
                        <div>
                          <Lock size={14} /> Secure Payment
                        </div>
                        <div>
                          <Check size={14} /> SSL Encrypted
                        </div>
                        <div>
                          <CreditCard size={14} /> PCI Compliant
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Compare All Features</h2>
            <Table responsive hover>
              <thead className="bg-light">
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th>Gold</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Profile Creation", basic: true, gold: true },
                  {
                    feature: "Profile Browsing",
                    basic: "10/day",
                    gold: "Unlimited",
                  },
                  {
                    feature: "Send Proposals",
                    basic: "5/month",
                    gold: "Unlimited",
                  },
                  { feature: "Direct Chat", basic: false, gold: true },
                  { feature: "View Contact Details", basic: false, gold: true },
                  { feature: "Advanced Filters", basic: false, gold: true },
                  { feature: "Profile Highlighting", basic: false, gold: true },
                  {
                    feature: "Event Access",
                    basic: "Paid",
                    gold: "3 Events Free",
                  },
                  { feature: "Verification Badge", basic: false, gold: true },
                  {
                    feature: "Personalized Matchmaking",
                    basic: false,
                    gold: true,
                  },
                  {
                    feature: "Background Verification",
                    basic: false,
                    gold: true,
                  },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature}</td>
                    <td>
                      {typeof row.basic === "boolean" ? (
                        row.basic ? (
                          <Check className="text-success" />
                        ) : (
                          <X className="text-danger" />
                        )
                      ) : (
                        row.basic
                      )}
                    </td>
                    <td>
                      {typeof row.gold === "boolean" ? (
                        row.gold ? (
                          <Check className="text-success" />
                        ) : (
                          <X className="text-danger" />
                        )
                      ) : (
                        row.gold
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Body className="text-center p-5">
          <div className="display-1 text-success mb-3">✓</div>
          <h2>Payment Successful!</h2>
          <p className="text-muted mb-4">
            Your subscription has been activated. Welcome to Premium!
          </p>
          <Button
            variant="danger"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Go to Dashboard
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentPage;
