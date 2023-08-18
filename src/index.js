import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence } from "framer-motion";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnimatePresence>
          <App />
        </AnimatePresence>
      </PersistGate>
      {/* <ToastContainer position="top-right" autoClose={1000} theme="dark" /> */}
    </Provider>
  </React.StrictMode>
);

//
