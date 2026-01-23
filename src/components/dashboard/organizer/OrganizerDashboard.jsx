import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export const EventOrganizerDashboard = () => {
  const stats = [
    { icon: "📅", number: "12", label: "Total Events", variant: "primary" },
    { icon: "✔", number: "5", label: "Active Events", variant: "success" },
    { icon: "👥", number: "245", label: "Total Participants", variant: "info" },
    { icon: "⏳", number: "18", label: "Pending Requests", variant: "warning" },
  ];

  return (
    <Container fluid>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h1 className="mb-2">Welcome, Meera!</h1>
          <p className="text-muted">Manage your events and participants</p>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card
              className="text-center h-100 shadow-sm"
              style={{ transition: "transform 0.3s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Card.Body>
                <div style={{ fontSize: "2.5rem" }}>{stat.icon}</div>
                <h2 className={`text-${stat.variant} mb-2`}>{stat.number}</h2>
                <p className="text-muted mb-0">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
