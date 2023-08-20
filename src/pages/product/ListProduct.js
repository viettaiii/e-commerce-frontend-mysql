import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  OverlayTrigger,
  Pagination,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import { getCategories } from "../../features/category/categorySlice";
import { getProviders } from "../../features/provider/providerSlice";
import { getColors } from "../../features/color/colorSlice";
import { formatCurrency, formatDate } from "../../utils/format";
import Section from "../../components/Section";
import OffcanvasFrame from "../../components/OffcanvasFrame";

const optionsPrice = [
  {
    title: "Thấp đến Cao",
    value: "price",
  },
  {
    title: "Cao đến Thấp",
    value: "-price",
  },
  {
    title: "Ngày tạo mới đây",
    value: "createdAt",
  },
  {
    title: "Ngày tạo cũ nhất",
    value: "-createdAt",
  },
  {
    title: "Ngày sửa mới đây",
    value: "updatedAt",
  },
  {
    title: "Ngày sửa cũ nhất",
    value: "-updatedAt",
  },
];
function ListProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  // STORE REDUX
  const { products, perPage, total } = useSelector((store) => store.product);
  const { categories } = useSelector((store) => store.category);
  const { providers } = useSelector((store) => store.provider);
  const { colors } = useSelector((store) => store.color);

  // TẠO STATUS
  const createStatus = (inventoryCount) => {
    let status = "selling";
    if (parseInt(inventoryCount) <= 0) {
      status = "sold-out";
    }
    return <span className={status}>{status}</span>;
  };

  // TẠO ROWS TABLES PRODUCT
  const createRow = (products) => {
    return products.map((product) => {
      return (
        <tr key={product.id}>
          <td>
            <Form.Check className="mt-1" type="checkbox" name={product.name} />
          </td>
          <td>
            <div className="d-flex gap-1 align-items-center">
              <span className="me-1">
                <Image src={product.image} roundedCircle />
              </span>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 300 }}
                overlay={<Tooltip id={product.id}>{product.name}</Tooltip>}
              >
                <span className="text-wrap-1"> {product.name}</span>
              </OverlayTrigger>
            </div>
          </td>
          <td>{product.category.categoryName}</td>
          <td>{product.provider.providerName}</td>
          <td>
            <strong>{formatCurrency(product.price)}</strong>
          </td>
          <td>
            <strong>
              {formatCurrency(
                product.price - (product.price * product.discount) / 100
              )}
            </strong>{" "}
          </td>
          <td>{product.inventoryCount}</td>
          <td>{createStatus(product.inventoryCount)}</td>
          <td>
            <span className="mdi mdi-loupe icon-md hover-color-success"></span>
          </td>
          <td>
            <span>{formatDate(product.createdAt)}</span>
          </td>
          <td>
            <span>{formatDate(product.updatedAt)}</span>
          </td>
          <td>
            <div className="d-flex gap-3">
              <span className="mdi mdi-note-edit-outline icon-md hover-color-success"></span>
              <span className="mdi mdi-trash-can-outline icon-md hover-color-success"></span>
            </div>
          </td>
        </tr>
      );
    });
  };

  // TẠO OPTION CATEGORY
  const createOptionCategory = (categories) => {
    return categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      );
    });
  };

  // TẠO OPTION PROVIDER
  const createOptionProvider = (providers) => {
    return providers.map((provider) => {
      return (
        <option key={provider.id} value={provider.id}>
          {provider.providerName}
        </option>
      );
    });
  };
  // TẠO OPTION COLOR
  const createOptionColor = (colors) => {
    return colors.map((color) => {
      return (
        <option key={color.id} value={color.id}>
          {color.value}
        </option>
      );
    });
  };

  // Tạo options price
  const createOptionPrice = (optionsPrice) => {
    return optionsPrice.map((option) => {
      return (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      );
    });
  };

  // BUTTION OffcanvasFrame

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="products">
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
                {createOptionCategory(categories)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nhà cung cấp</Form.Label>
              <Form.Select name="providerId">
                <option hidden>Nhà cung cấp</option>
                {createOptionProvider(providers)}
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
                      {createOptionColor(colors)}
                    </Form.Select>
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
      <h4 className="py-4">
        <strong>Products</strong>
      </h4>
      <Section>
        <div className="d-flex gap-10">
          <Button variant="outline-secondary btn-xs btn-icon ">
            <span className="mdi mdi-export icon-md rotate--90"></span>
            <span>Export</span>
          </Button>
          <Button variant="outline-secondary btn-sm btn-icon ms-2">
            <span className="mdi mdi-export  icon-md  rotate-90"></span>
            <span>Import</span>
          </Button>
        </div>
        <div className="d-flex gap-10">
          <Button variant="danger btn-xl btn-icon">
            <span className="mdi mdi-trash-can-outline icon-md "></span>
            <span>Xóa SP</span>
          </Button>
          <Button variant="success btn-xl btn-icon ms-2" onClick={handleShow}>
            <span className="mdi mdi-plus icon-md "></span>
            <span>Thêm SP</span>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="w-100">
          <Form.Control type="text" placeholder="Tìm kiếm sản phẩm..." />
        </div>
        <div className="w-100 ms-1">
          <Form.Select>
            <option hidden>Loại</option>
            <option value="all">All</option>
            {createOptionCategory(categories)}
          </Form.Select>
        </div>
        <div className="w-100 ms-1">
          <Form.Select>
            <option hidden>Nhà cung cấp</option>
            <option value="all">All</option>
            {createOptionProvider(providers)}
          </Form.Select>
        </div>
        <div className="w-100 ms-1">
          <Form.Select>
            <option hidden>Giá</option>
            <option value="all">All</option>
            {createOptionPrice(optionsPrice)}
          </Form.Select>
        </div>
      </Section>
      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>
                <Form.Check type="checkbox" name="selectAll" />
              </th>
              <th>Tên SP</th>
              <th>Loại SP</th>
              <th>Nhà cung cấp</th>
              <th>Giá</th>
              <th>Giá sale</th>
              <th>Tồn kho</th>
              <th>Status</th>
              <th>Xem</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{createRow(products)}</tbody>
        </Table>
      </div>
      <div className="w-100 bg-white rounded-bottom px-2 py-3 d-flex justify-content-between align-items-center">
        <div>
          Show 1-{perPage} của {total} SP
        </div>
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
