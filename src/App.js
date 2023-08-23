import ListProduct from "./pages/product/ListProduct";
import Sidebar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
function App() {
  const { isSideBarOpen } = useSelector((store) => store.sideBar);
  const { isSpinner } = useSelector((store) => store.spinner);

  const variantsSideBar = {
    initial: {
      x: -200,
      opacity: 0.5,
      width: 0,
    },
    animate: { x: 0, opacity: 1, width: "auto" },
    exit: {
      x: -200,
      opacity: 0.5,
      width: 0,
    },
    transition: { duration: 4, ease: "ease-in-out" },
  };
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="main-content">
            <AnimatePresence>
              {isSideBarOpen && (
                <motion.div
                  variants={variantsSideBar}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition="transition"
                >
                  <Sidebar />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-100">
              <NavBar />

              <Routes>
                <Route path="/admin/products" element={<ListProduct />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>

        {/* Toast message */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

      {/* Loading overlay */}
      {isSpinner && (
        <LoadingOverlay
          active={isSpinner}
          spinner
          text="Waiting for me..."
        ></LoadingOverlay>
      )}
    </>
  );
}

export default App;
