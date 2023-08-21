import PropTypes from "prop-types";
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

OffcanvasFrame.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};
export default OffcanvasFrame;
