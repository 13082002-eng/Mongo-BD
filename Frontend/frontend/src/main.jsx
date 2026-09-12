import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  </StrictMode>
);