import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { InDevelopment } from "./components/InDevelopment";

function App() {
  return (
    <div className="px-4 pt-4 max-w-screen-xl mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<InDevelopment />} />
            <Route path="signup" element={<InDevelopment />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<InDevelopment />} />
            <Route path="/user" element={<InDevelopment />} />
            <Route path="/restaurant">
              <Route path="items" element={<Outlet />}>
                <Route path="supplies" element={<InDevelopment />} />
                <Route path="subproducts" element={<InDevelopment />} />
                <Route path="products" element={<InDevelopment />} />
                <Route path="combos" element={<InDevelopment />} />
              </Route>
              <Route path="controls" element={<Outlet />}>
                <Route path="requirements" element={<InDevelopment />} />
                <Route path="productions" element={<InDevelopment />} />
                <Route path="counts" element={<InDevelopment />} />
              </Route>
              <Route path="tools" element={<Outlet />}>
                <Route path="converter" element={<InDevelopment />} />
                <Route path="book" element={<InDevelopment />} />
              </Route>
              <Route path="analytics" element={<Outlet />}>
                <Route path="matrix" element={<InDevelopment />} />
              </Route>
              <Route path="settings" element={<Outlet />}>
                <Route path="general" element={<InDevelopment />} />
                <Route path="team" element={<InDevelopment />} />
                <Route path="categories" element={<InDevelopment />} />
                <Route path="areas" element={<InDevelopment />} />
                <Route path="warehouses" element={<InDevelopment />} />
              </Route>
              <Route path="subscription" element={<InDevelopment />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
