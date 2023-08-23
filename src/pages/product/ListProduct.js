import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Modal,
  OverlayTrigger,
  Pagination,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteManyProduct,
  deleteProduct,
  getProducts,
} from "../../features/product/productSlice";
import { getCategories } from "../../features/category/categorySlice";
import { getProviders } from "../../features/provider/providerSlice";
import { getColors } from "../../features/color/colorSlice";
import { formatCurrency, formatDate } from "../../utils/format";
import Section from "../../components/Section";
import OffvancasAddProduct from "../../components/Offcanvas/OffcanvasAddProduct";
import { setSpinner } from "../../features/spinnerSlice";

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

  // DELETE PRODUCT
  const [slugsDelete, setSlugsDelete] = useState([]);
  const [slugProduct, setSlugProduct] = useState(null);
  const [isModal, setIsModal] = useState(false);
  // Handle check box select
  const handleCheckBoxChange = (e) => {
    const isSelected = slugsDelete.find((slug) => slug === e.target.value);
    if (isSelected) {
      setSlugsDelete((prev) => [
        ...prev.filter((slug) => slug !== e.target.value),
      ]);
      return;
    }
    setSlugsDelete((prev) => [...prev, e.target.value]);
  };

  console.log(slugsDelete);
  // handle delete many product

  const handleDeleteManyProduct = async (slugsDelete) => {
    setSlugsDelete([]);
    const { payload } = await dispatch(deleteManyProduct(slugsDelete));
    if (payload.status === 200) {
      dispatch(getProducts());
    }
  };

  // delete one product
  const handleDeleteProduct = async (slugProduct) => {
    setSlugProduct(null);
    const { payload } = await dispatch(deleteProduct(slugProduct));
    if (payload.status === 200) {
      dispatch(getProducts());
    }
  };

  // handle modal delete product
  const handleModalDeleteProduct = () => {
    setIsModal(false);
    dispatch(setSpinner(true));
    if (slugProduct) {
      handleDeleteProduct(slugProduct);
    } else if (slugsDelete.length > 0) {
      handleDeleteManyProduct(slugsDelete);
    }
    dispatch(setSpinner(false));
  };

  // ============================== RENDER REACTJS ===================================
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
      const isChecked = slugsDelete.includes(product.slug);
      return (
        <tr key={product.id}>
          <td>
            <Form.Check
              className="mt-1"
              type="checkbox"
              name={product.name}
              value={product.slug}
              checked={isChecked}
              onChange={handleCheckBoxChange}
            />
          </td>
          <td className="  w-20 h-20">
            <div className="d-flex gap-1 align-items-center">
              <span className="me-1 w-10 h-10">
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
              <span
                className="mdi mdi-trash-can-outline icon-md hover-color-success"
                onClick={() => {
                  setIsModal(true);
                  setSlugProduct(product.slug);
                }}
              ></span>
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
  const createOptionProvider = useCallback(
    (providers) => {
      return providers.map((provider) => {
        return (
          <option key={provider.id} value={provider.id}>
            {provider.providerName}
          </option>
        );
      });
    },
    [providers]
  );
  // TẠO OPTION COLOR

  // Tạo options price
  const createOptionPrice = useCallback(
    (optionsPrice) => {
      return optionsPrice.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        );
      });
    },
    [optionsPrice]
  );

  // button actions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="products">
      {/* MODAL ADD NEW PRODUCt */}
      <OffvancasAddProduct
        optionsCategory={createOptionCategory(categories)}
        optionsProvider={createOptionProvider(providers)}
        colors={colors}
        show={show}
        handleClose={handleClose}
      />

      {/* PAGE LIST PRODUCTS*/}
      <h4 className="py-4">
        <strong>Products</strong>
      </h4>

      {/* SECTION */}
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
          <Button
            variant="danger btn-xl btn-icon"
            onClick={() => setIsModal(true)}
          >
            <span className="mdi mdi-trash-can-outline icon-md "></span>
            <span>Xóa</span>
          </Button>
          <Button variant="success btn-xl btn-icon ms-2" onClick={handleShow}>
            <span className="mdi mdi-plus icon-md "></span>
            <span>Thêm</span>
          </Button>
        </div>
      </Section>

      {/* SECTION */}
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

      {/*Tables  */}
      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  name="selectAll"
                  checked={
                    products.length > 0 &&
                    slugsDelete.length === products.length
                  }
                  onChange={() => {
                    const isSelectedAll = slugsDelete.length > 0;
                    if (isSelectedAll) return setSlugsDelete([]);
                    const slugs = products.map((product) => product.slug);
                    setSlugsDelete(slugs);
                  }}
                />
              </th>
              <th>Tên</th>
              <th>Loại</th>
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

      {/* Pagination page */}
      <div className="w-100 bg-white rounded-bottom px-2 py-3 d-flex justify-content-between align-items-center">
        <div>
          Show 1-{perPage} của {total}
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

      {/* Modal comfirm delete product*/}
      <Modal
        show={isModal}
        size="xs"
        onHide={() => setIsModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Xóa sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-danger">Bạn có chắc là muốn xóa sản phẩm này</h5>
          <p>Sản phẩm này không thể khôi phục sau khi bạn đã xóa!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success btn-md px-5"
            onClick={handleModalDeleteProduct}
          >
            Xóa
          </Button>
          <Button
            variant="outline-danger btn-md"
            onClick={() => setIsModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListProduct;
