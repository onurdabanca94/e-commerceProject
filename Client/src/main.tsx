import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Routes.tsx";
import { CartContextProvider } from "./context/CartContext.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </Provider>
  </StrictMode>
);
