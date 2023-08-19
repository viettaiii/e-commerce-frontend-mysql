import { Button, Container, Form } from "react-bootstrap";

function ListProduct() {
  return (
    <Container className="products">
      <h4 className="py-4">
        <strong>Products</strong>
      </h4>
      <div className="section-1">
        <div className="left">
          <Button variant="outline-secondary btn-xs btn-icon">
            <span className="mdi mdi-export icon-md rotate--90"></span>
            <span>Export</span>
          </Button>
          <Button variant="outline-secondary btn-sm btn-icon">
            <span className="mdi mdi-export  icon-md  rotate-90"></span>
            <span>Import</span>
          </Button>
        </div>
        <div className="right">
          <Button variant="danger btn-xl btn-icon">
            <span className="mdi mdi-trash-can-outline icon-md "></span>
            <span>Xóa SP</span>
          </Button>
          <Button variant="success btn-xl btn-icon">
            <span className="mdi mdi-plus icon-md "></span>
            <span>Thêm SP</span>
          </Button>
        </div>
      </div>
      <div className="section-2 mt-5">
        <div className="w-100">
          <Form.Control type="text" placeholder="Tìm kiếm sản phẩm..." />
        </div>
        <div className="w-100">
          <Form.Select>
            <option>Tìm kiếm theo loại</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="w-100">
          <Form.Select>
            <option>Mặc định</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
    </Container>
  );
}

export default ListProduct;
