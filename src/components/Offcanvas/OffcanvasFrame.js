import PropTypes from "prop-types";
import { Button, Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";

function OffcanvasFrame({
  show,
  handleClose,
  children,
  title,
  className,
  onSubmit,
}) {
  const { isLoading } = useSelector((store) => store.product);
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
      <div className="mt-4 d-flex gap-2 bg-white p-2 py-4 shadow-lg">
        <Button
          variant="success btn-xl btn-full-w"
          type="submit"
          onClick={onSubmit}
          disabled={isLoading}
        >
          Thêm mới
        </Button>
        <Button
          variant="outline-danger  btn-xl btn-full-w"
          onClick={handleClose}
        >
          Hủy
        </Button>
      </div>
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
