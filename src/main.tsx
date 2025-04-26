import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/Store.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetail from "./pages/UserDetail.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/api-user-list">
            <Route element={<App />} index={true} />
            <Route element={<UserDetail />} path="user-detail/:id" />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
