import { useState } from "react";
import OffcanvasFrame from "./OffcanvasFrame";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

function OffvancasAddProduct({
  handleClose,
  show,
  optionsCategory,
  optionsProvider,
  optionsColor,
}) {
  // REACT
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    discount: 0,
    categoryId: "",
    providerId: "",
  });

  const [productItems, setProductItems] = useState([
    { qtyInStock: 0, image: null, colorId: "", isSpecial: false },
  ]);

  return (
    <OffcanvasFrame
      show={show}
      title={"Thêm mới sản phẩm"}
      handleClose={handleClose}
      className="w-40"
    >
      <span className="text-success text-md">Thông tin</span>
      <hr />
      <Form>
        <Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên sản phẩm..."
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control type="text" placeholder="Giá" name="price" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả </Form.Label>
            <Form.Control type="text" placeholder="Giá" name="description" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>% Sales</Form.Label>
            <Form.Control type="text" placeholder="%Sales" name="discount" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại</Form.Label>
            <Form.Select name="categoryId">
              <option hidden>Loại</option>
              {optionsCategory}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nhà cung cấp</Form.Label>
            <Form.Select name="providerId">
              <option hidden>Nhà cung cấp</option>
              {optionsProvider}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">Sản phẩm con</Form.Label>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Số lượng"
                    name="qtyInStock"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="file"
                    name="image"
                    placeholder="Chọn ảnh"
                  />
                </Col>
                <Col>
                  <Form.Select name="colorId">
                    <option hidden>Màu SP</option>
                    {optionsColor}
                  </Form.Select>
                </Col>
                <Col xl="1" className="d-flex align-items-center">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 150, hide: 200 }}
                    overlay={
                      <Tooltip id="button-tooltip">
                        Mô tả: Sản phẩm đặc biệt liên hể để mua
                      </Tooltip>
                    }
                  >
                    <Form.Check // prettier-ignore
                      type="switch"
                      name="isSpecial"
                    />
                  </OverlayTrigger>
                </Col>
                <Col>
                  <div>
                    <Button variant="success">Thêm</Button>
                    <Button variant="danger ms-1">Xóa</Button>
                  </div>
                </Col>
              </Row>
            </Form.Group>
          </Form.Group>
        </Form.Group>
        <div className="mt-4">
          <Button variant="success btn-xl" type="submit">
            Thêm mới
          </Button>
          <Button variant="outline-danger ms-3 btn-xl" type="submit">
            Hủy
          </Button>
        </div>
      </Form>
    </OffcanvasFrame>
  );
}

export default OffvancasAddProduct;
