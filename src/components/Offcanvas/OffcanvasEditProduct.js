import { useEffect, useState } from "react";
import OffcanvasFrame from "./OffcanvasFrame";
import {
  Button,
  Col,
  Form,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { handleFiles } from "../../utils/handleFile";
import { useDispatch } from "react-redux";
import {
  getProducts,
  updateProduct,
} from "../../features/product/productSlice";
import httpRequest from "../../api/httpRequest";

function OffvancasEditProduct({
  handleClose,
  show,
  optionsCategory,
  optionsProvider,
  colors,
  slug,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductDetail = async (slug) => {
      try {
        const { data } = await httpRequest.get("/products/" + slug);
        setProduct(data.data);
        setProductItems(data.data.productItems);
      } catch (err) {
        console.log(err);
      }
    };

    slug && getProductDetail(slug);
  }, [slug, dispatch]);

  // REACT
  const [product, setProduct] = useState({});

  const [productItems, setProductItems] = useState([
    { qtyInStock: 0, image: null, colorId: "" },
  ]);

  // Handle product
  const handleProductChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm 1 product item
  const addProductItem = () => {
    setProductItems((prev) => [
      ...prev,
      { qtyInStock: 0, image: null, colorId: "", isSpecial: false },
    ]);
  };

  // Xóa 1 product item
  const deleteProductItem = (index) => {
    if (productItems.length <= 1) return toast("Mỗi SP cần ít nhất SP con!");
    setProductItems((prev) => [...prev.filter((_, idx) => idx !== index)]);
  };

  // Xử lí product item change
  const handleProductItemChange = (index, name, value) => {
    const updatedProductItems = [...productItems];
    updatedProductItems[index][name] = value;
    setProductItems(updatedProductItems);
  };

  // Handle add new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate product
    const { name, price, description, providerId, categoryId } = product;
    if (!name) return toast("Tên SP yêu cầu có!");
    if (!price) return toast("Giá yêu cầu có!");
    if (!description) return toast("Mô tả SP yêu cầu có!");
    if (!providerId) return toast("Nhà cung cấp SP yêu cầu có!");
    if (!categoryId) return toast("Loại SP yêu cầu có!");

    // Validate product items
    let err = null;
    productItems.forEach((productItem, index) => {
      const { qtyInStock, image, colorId } = productItem;
      if (!qtyInStock) return (err = `Số lượng SP ${index + 1} yêu cầu có!`);
      if (!image) return (err = `Ảnh SP ${index + 1} yêu cầu có!`);
      if (!colorId) return (err = `Màu SP ${index + 1} yêu cầu có!`);
    });
    if (err) return toast(err);

    const images = [];
    // Xử lí ảnh
    let i = 0;
    let listFiles = [];

    // Xử lí image string,image file
    productItems.forEach((productItem) => {
      images.push(
        typeof productItem.image === "object"
          ? i++
          : productItem.image.replace(
              process.env.REACT_APP_BACKEND_UPLOAD_URL,
              ""
            )
      );
      if (typeof productItem.image !== "string")
        listFiles.push(productItem.image);
    });
    let listImage = await handleFiles(listFiles);

    images.forEach((value, index) => {
      if (typeof value === "number") {
        images[index] = listImage[value];
      }
    });

    product.image = images[0];
    productItems.forEach(
      (productItem, index) => (productItem.image = images[index])
    );

    // Thêm mới sản phẩm vào Database
    const updateItem = { ...product, productItems };

    const { payload } = await dispatch(
      updateProduct({ slug, inputs: updateItem })
    );
    if (payload.status === 200) {
      await dispatch(getProducts());
      handleClose();
    }
  };

  // TẠO OPTIONS COLORS
  const createOptionColor = (colors) => {
    return colors.map((color) => {
      const disabled = productItems.find((item) => item.colorId === color.id);
      return (
        <option key={color.id} disabled={disabled} value={color.id}>
          {color.value}
        </option>
      );
    });
  };

  // Fake image selected
  const fakeImage = (image) => {
    if (typeof image === "object") image = URL.createObjectURL(image);
    else image = process.env.REACT_APP_BACKEND_UPLOAD_URL + "/" + image;
    return <Image className="w-50 h-50" src={image} alt="" />;
  };

  // TẠO RENDER PRODUCT ITEM
  const renderProductItem = (productItems) => {
    return productItems.map((productItem, index) => {
      return (
        <Form.Group key={index} className="mt-1">
          <Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="Số lượng"
                name="qtyInStock"
                value={productItem.qtyInStock}
                onChange={(e) => {
                  const qtyInStock = parseInt(e.target.value);
                  if (qtyInStock <= 0) toast("SL cần phải lớn hơn 1 sp!");
                  handleProductItemChange(index, e.target.name, qtyInStock);
                }}
              />
            </Col>
            <Col xl="2">
              <Form.Label htmlFor={`product-item-image-${index}`}>
                {productItem.image ? (
                  fakeImage(productItem.image)
                ) : (
                  <Form.Control
                    type="file"
                    id={`product-item-image-${index}`}
                    name="image"
                    onChange={(e) =>
                      handleProductItemChange(
                        index,
                        e.target.name,
                        e.target.files[0]
                      )
                    }
                  />
                )}
                <Form.Control
                  type="file"
                  id={`product-item-image-${index}`}
                  name="image"
                  hidden={true}
                  onChange={(e) =>
                    handleProductItemChange(
                      index,
                      e.target.name,
                      e.target.files[0]
                    )
                  }
                />
              </Form.Label>
            </Col>
            <Col>
              <Form.Select
                name="colorId"
                value={productItem.colorId}
                onChange={(e) =>
                  handleProductItemChange(index, e.target.name, e.target.value)
                }
              >
                <option hidden>Màu SP</option>
                {createOptionColor(colors)}
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
                  value={productItem.isSpecial}
                  onChange={(e) =>
                    handleProductItemChange(
                      index,
                      e.target.name,
                      e.target.checked
                    )
                  }
                />
              </OverlayTrigger>
            </Col>
            <Col>
              <div>
                <Button variant="success" onClick={addProductItem}>
                  Thêm
                </Button>
                <Button
                  variant="danger ms-1"
                  onClick={() => deleteProductItem(index)}
                >
                  Xóa
                </Button>
              </div>
            </Col>
          </Row>
        </Form.Group>
      );
    });
  };

  return (
    <OffcanvasFrame
      show={show}
      title={"Edit"}
      handleClose={handleClose}
      className="w-40"
      onSubmit={handleSubmit}
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
              value={product.name}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="text"
              placeholder="Giá"
              name="price"
              value={product.price}
              onChange={(e) => {
                const price = parseInt(e.target.value);
                if (price < 0 || price > 100000000)
                  return toast("Giá sp lớn hon 0 và cần phải bé hơn 100tr");
                handleProductChange(e.target.name, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả </Form.Label>
            <Form.Control
              type="text"
              placeholder="Giá"
              name="description"
              value={product.description}
              onChange={(e) =>
                handleProductChange(e.target.name, e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>% Sales</Form.Label>
            <Form.Control
              type="text"
              placeholder="%Sales"
              name="discount"
              value={product.discount}
              onChange={(e) => {
                const discount = parseInt(e.target.value);
                if (discount < 0 || discount > 100)
                  return toast("% Sales chỉ từ 0 - 100");
                handleProductChange(e.target.name, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại</Form.Label>
            <Form.Select
              name="categoryId"
              value={product.categoryId}
              onChange={(e) =>
                handleProductChange(e.target.name, e.target.value)
              }
            >
              <option hidden>Loại</option>
              {optionsCategory}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nhà cung cấp</Form.Label>
            <Form.Select
              name="providerId"
              value={product.providerId}
              onChange={(e) =>
                handleProductChange(e.target.name, e.target.value)
              }
            >
              <option hidden>Nhà cung cấp</option>
              {optionsProvider}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">Sản phẩm con</Form.Label>
            {renderProductItem(productItems)}
          </Form.Group>
        </Form.Group>
      </Form>
    </OffcanvasFrame>
  );
}

export default OffvancasEditProduct;
