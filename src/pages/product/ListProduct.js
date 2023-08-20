import {
  Button,
  Container,
  Form,
  Image,
  Pagination,
  Table,
} from "react-bootstrap";

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
      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>
                <Form.Check type="checkbox" name="selectAll" />
              </th>
              <th>Tên SP</th>
              <th>Loại SP</th>
              <th>Giá</th>
              <th>Giá sale</th>
              <th>Tồn kho</th>
              <th>Status</th>
              <th>Xem</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Check type="checkbox" name="selectAll" />
              </td>
              <td>
                <div className="d-flex gap-1 align-items-center">
                  <span className="me-1">
                    <Image src="holder.js/171x180" roundedCircle />
                  </span>
                  <span> Mark</span>
                </div>
              </td>
              <td>Iphone 16</td>
              <td>
                <strong>12.000.000 d</strong>
              </td>
              <td>
                <strong>12%</strong>{" "}
              </td>
              <td>52</td>
              <td>
                <span className="sold-out">selling</span>
              </td>
              <td>
                <span class="mdi mdi-loupe icon-md hover-color-success"></span>
              </td>
              <td>
                <div className="d-flex gap-3">
                  <span class="mdi mdi-note-edit-outline icon-md hover-color-success"></span>
                  <span class="mdi mdi-trash-can-outline icon-md hover-color-success"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="w-100 bg-white rounded-bottom px-2 py-3 d-flex justify-content-between align-items-center">
        <div>Show 1-20 của 280</div>
        <div>
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item active>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </Container>
  );
}

export default ListProduct;
