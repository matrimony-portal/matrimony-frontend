import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

export const BlockedUsers = () => {
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const blockedUsers = [
    { id: 1, name: "Sanjay Kumar", initials: "SK", date: "Oct 15, 2025" },
    { id: 2, name: "Ajay Mehta", initials: "AM", date: "Oct 10, 2025" },
    { id: 3, name: "Rohan Verma", initials: "RV", date: "Oct 5, 2025" },
  ];

  const closeModal = () => setModal({ ...modal, show: false });

  const handleUnblock = (name) => {
    setModal({
      show: true,
      title: "Unblock User",
      message: `Unblock ${name}? They will be able to view your profile and contact you again.`,
      onConfirm: () => {
        toast.success(`${name} has been unblocked successfully.`);
        closeModal();
      },
    });
  };

  return (
    <Container fluid>
      <ConfirmationModal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        variant="warning"
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />

      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-2">Blocked Users</h2>
          <p className="text-muted mb-4">
            These users cannot view your profile or contact you
          </p>

          <div className="d-flex flex-column gap-3">
            {blockedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-light p-3 rounded d-flex justify-content-between align-items-center flex-wrap gap-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: "50px",
                      height: "50px",
                      background:
                        "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
                    }}
                  >
                    {user.initials}
                  </div>
                  <div>
                    <h6 className="mb-0">{user.name}</h6>
                    <small className="text-muted">
                      Blocked on: {user.date}
                    </small>
                  </div>
                </div>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleUnblock(user.name)}
                >
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
