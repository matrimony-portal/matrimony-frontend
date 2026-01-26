import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { OverallEventsList } from "./EventList.jsx";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { eventService } from "../../../services/eventService.js";

export const EventOrganizerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { icon: "📅", number: "0", label: "Total Events", variant: "primary" },
    { icon: "✔", number: "0", label: "Active Events", variant: "success" },
    { icon: "👥", number: "0", label: "Total Participants", variant: "info" },
    { icon: "⏳", number: "0", label: "Pending Requests", variant: "warning" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const statistics = await eventService.getEventStatistics();

        setStats([
          {
            icon: "📅",
            number: statistics.totalEvents?.toString() || "0",
            label: "Total Events",
            variant: "primary",
          },
          {
            icon: "✔",
            number: statistics.activeEvents?.toString() || "0",
            label: "Active Events",
            variant: "success",
          },
          {
            icon: "👥",
            number: statistics.totalRegistrations?.toString() || "0",
            label: "Total Registrations",
            variant: "info",
          },
          {
            icon: "⏳",
            number: statistics.pendingRegistrations?.toString() || "0",
            label: "Pending Payments",
            variant: "warning",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback to basic stats if statistics endpoint fails
        try {
          const myEvents = await eventService.getMyEvents();
          const events = Array.isArray(myEvents) ? myEvents : [];
          const totalEvents = events.length;
          const activeEvents = events.filter(
            (e) => e.status === "UPCOMING" || e.status === "ONGOING",
          ).length;

          setStats([
            {
              icon: "📅",
              number: totalEvents.toString(),
              label: "Total Events",
              variant: "primary",
            },
            {
              icon: "✔",
              number: activeEvents.toString(),
              label: "Active Events",
              variant: "success",
            },
            {
              icon: "👥",
              number: "0",
              label: "Total Registrations",
              variant: "info",
            },
            {
              icon: "⏳",
              number: "0",
              label: "Pending Payments",
              variant: "warning",
            },
          ]);
        } catch (fallbackError) {
          console.error("Error fetching fallback stats:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  const userName = user?.name || user?.firstName || "Organizer";

  return (
    <Container fluid>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h1 className="mb-2">Welcome, {userName}!</h1>
          <p className="text-muted">Manage your events and participants</p>
        </Card.Body>
      </Card>

      {loading ? (
        <Row className="g-4 mb-4">
          <Col xs={12} className="text-center py-4">
            <Spinner animation="border" variant="danger" />
          </Col>
        </Row>
      ) : (
        <Row className="g-4 mb-4">
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
      )}

      {/* Overall Events Section */}
      <OverallEventsList />
    </Container>
  );
};
