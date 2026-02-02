import { useState, useEffect } from "react";
import { Link } from "react-router";
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
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";

function formatRequestDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusToConfig(paymentStatus) {
  const map = {
    PENDING: { label: "Pending", variant: "primary", icon: "bi-clock" },
    PAID: { label: "Accepted", variant: "success", icon: "bi-check-circle" },
    REFUNDED: { label: "Rejected", variant: "secondary", icon: "bi-x-circle" },
  };
  return (
    map[paymentStatus] ?? {
      label: paymentStatus,
      variant: "secondary",
      icon: "bi-flag",
    }
  );
}

export const EventRequests = () => {
  const base = useDashboardBasePath();
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
      window.dispatchEvent(new CustomEvent("refresh-event-requests-badge"));
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
          <h3 className="mb-4">
            <i className="bi bi-inbox-fill me-2" aria-hidden="true" />
            Recent Event Requests
          </h3>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" aria-hidden="true" />
              <p className="mt-2 text-muted">
                <i className="bi bi-hourglass-split me-1" aria-hidden="true" />
                Loading requests...
              </p>
            </div>
          ) : error ? (
            <p className="text-danger mb-0">{error}</p>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="bg-light">
                  <tr>
                    <th>
                      <i className="bi bi-person me-1" aria-hidden="true" />
                      Name
                    </th>
                    <th>
                      <i
                        className="bi bi-calendar-event me-1"
                        aria-hidden="true"
                      />
                      Event
                    </th>
                    <th>
                      <i className="bi bi-calendar3 me-1" aria-hidden="true" />
                      Request Date
                    </th>
                    <th>
                      <i className="bi bi-flag me-1" aria-hidden="true" />
                      Status
                    </th>
                    <th>
                      <i className="bi bi-hand-index me-1" aria-hidden="true" />
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        <i
                          className="bi bi-inbox d-block fs-2 mb-2"
                          aria-hidden="true"
                          style={{ opacity: 0.5 }}
                        />
                        No event requests yet.
                      </td>
                    </tr>
                  ) : (
                    requests.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <Link
                            to={`${base}/participant-profile/${r.id}`}
                            className="text-primary table-link"
                            title="View user profile"
                          >
                            {r.userName ?? "—"}
                          </Link>
                        </td>
                        <td>
                          {r.eventId ? (
                            <Link
                              to={`${base}/event-view/${r.eventId}`}
                              className="text-primary table-link"
                              title="View event details"
                            >
                              {r.eventTitle ?? "—"}
                            </Link>
                          ) : (
                            <>{r.eventTitle ?? "—"}</>
                          )}
                        </td>
                        <td>{formatRequestDate(r.registrationDate)}</td>
                        <td>
                          {(() => {
                            const { label, variant, icon } = statusToConfig(
                              r.paymentStatus,
                            );
                            return (
                              <Badge
                                bg={variant}
                                style={{ position: "static" }}
                                className="d-inline-flex align-items-center gap-1"
                              >
                                <i
                                  className={`bi ${icon}`}
                                  aria-hidden="true"
                                  style={{ fontSize: "0.9em" }}
                                />
                                {label}
                              </Badge>
                            );
                          })()}
                        </td>
                        <td>
                          <div className="d-flex gap-2 flex-wrap align-items-center">
                            {r.paymentStatus === "PENDING" && (
                              <>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleAccept(r)}
                                  title="Accept request"
                                >
                                  <i
                                    className="bi bi-check-lg me-1"
                                    aria-hidden="true"
                                  />
                                  Accept
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleReject(r)}
                                  title="Reject request"
                                >
                                  <i
                                    className="bi bi-x-lg me-1"
                                    aria-hidden="true"
                                  />
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
