import { Container, Card, Table, Badge, Button } from "react-bootstrap";

export const EventRequests = () => {
  const requests = [
    {
      id: 1,
      name: "Rahul Sharma",
      event: "Speed Dating Evening",
      date: "20th Oct 2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Agarwal",
      event: "Coffee Meetup",
      date: "19th Oct 2025",
      status: "Accepted",
    },
    {
      id: 3,
      name: "Amit Kumar",
      event: "Cultural Evening",
      date: "21st Oct 2025",
      status: "Pending",
    },
  ];

  const handleAccept = () => {
    if (window.confirm("Accept this participation request?")) {
      alert("Request accepted! Participant will be notified.");
    }
  };

  const handleReject = () => {
    if (window.confirm("Reject this participation request?")) {
      alert("Request rejected! Participant will be notified.");
    }
  };

  return (
    <Container fluid>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Recent Event Requests</h3>
          <div className="table-responsive">
            <Table hover>
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.name}</td>
                    <td>{request.event}</td>
                    <td>{request.date}</td>
                    <td>
                      <Badge
                        bg={
                          request.status === "Pending" ? "primary" : "success"
                        }
                        style={{ position: "static" }}
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        <Button variant="outline-secondary" size="sm">
                          View Profile
                        </Button>
                        {request.status === "Pending" && (
                          <>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleAccept(request.id)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
