import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Router from "./Routers/Index.jsx";
import { store, persistor } from "./Store/Store.js";
import AuthProvider from "./Context/AuthContext"; // ✅ ADD THIS
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* 🔥 THIS IS THE FIX */}
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
