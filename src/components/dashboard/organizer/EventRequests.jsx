import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Card,
  Table,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";
import { eventService } from "../../../services/eventService.js";

function formatRequestDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusToLabel(paymentStatus) {
  const map = { PENDING: "Pending", PAID: "Accepted", REFUNDED: "Rejected" };
  return map[paymentStatus] ?? paymentStatus;
}

function statusToVariant(paymentStatus) {
  const map = { PENDING: "primary", PAID: "success", REFUNDED: "secondary" };
  return map[paymentStatus] ?? "secondary";
}

export const EventRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    variant: "primary",
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getMyEventRegistrations();
      setRequests(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(
        e.response?.data?.message || e.message || "Failed to load requests.",
      );
      // Inline error is shown; no toast to avoid duplicate feedback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const closeModal = () => setModal((m) => ({ ...m, show: false }));

  const handleAccept = (reg) => {
    setModal({
      show: true,
      title: "Accept Request",
      message: `Accept ${reg.userName}'s participation request for "${reg.eventTitle}"?`,
      variant: "success",
      onConfirm: async () => {
        closeModal();
        try {
          await eventService.updateRegistrationPaymentStatus(reg.id, "PAID");
          toast.success("Request accepted! Participant will be notified.");
          await load();
        } catch (e) {
          toast.error(
            e.response?.data?.message || e.message || "Failed to accept.",
          );
        }
      },
    });
  };

  const handleReject = (reg) => {
    setModal({
      show: true,
      title: "Reject Request",
      message: `Reject ${reg.userName}'s participation request for "${reg.eventTitle}"? Money will be refunded.`,
      variant: "danger",
      onConfirm: async () => {
        closeModal();
        try {
          await eventService.updateRegistrationPaymentStatus(
            reg.id,
            "REFUNDED",
          );
          toast.success("Request rejected. Money will be refunded.");
          await load();
          // TODO: Later we can implement functionality to ask organiser to write a reason for rejecting someone.
        } catch (e) {
          toast.error(
            e.response?.data?.message || e.message || "Failed to reject.",
          );
        }
      },
    });
  };

  return (
    <Container fluid>
      <ConfirmationModal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        variant={modal.variant}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />

      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Recent Event Requests</h3>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
              <p className="mt-2 text-muted">Loading requests...</p>
            </div>
          ) : error ? (
            <p className="text-danger mb-0">{error}</p>
          ) : (
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
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No event requests yet.
                      </td>
                    </tr>
                  ) : (
                    requests.map((r) => (
                      <tr key={r.id}>
                        <td>{r.userName ?? "—"}</td>
                        <td>{r.eventTitle ?? "—"}</td>
                        <td>{formatRequestDate(r.registrationDate)}</td>
                        <td>
                          <Badge
                            bg={statusToVariant(r.paymentStatus)}
                            style={{ position: "static" }}
                          >
                            {statusToLabel(r.paymentStatus)}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2 flex-wrap">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/dashboard/organizer/participant-profile/${r.id}`,
                                )
                              }
                            >
                              View Profile
                            </Button>
                            {r.paymentStatus === "PENDING" && (
                              <>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleAccept(r)}
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleReject(r)}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
