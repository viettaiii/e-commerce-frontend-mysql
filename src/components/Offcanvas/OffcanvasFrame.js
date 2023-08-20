import { Offcanvas } from "react-bootstrap";

function OffcanvasFrame({ show, handleClose, children, title, className }) {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement={"end"}
      name={"end"}
      className={className}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasFrame;
