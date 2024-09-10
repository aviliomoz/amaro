import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { InDevelopment } from "./components/InDevelopment";
import { SuppliesPage } from "./pages/SuppliesPage";
import { SubproductsPage } from "./pages/SubproductsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CombosPage } from "./pages/CombosPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { AreasPage } from "./pages/AreasPage";
import { WarehousesPage } from "./pages/WarehousesPage";

function App() {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto relative">
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
                <Route path="supplies" element={<SuppliesPage />} />
                <Route path="subproducts" element={<SubproductsPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="combos" element={<CombosPage />} />
              </Route>
              <Route path="controls" element={<Outlet />}>
                <Route path="requirements" element={<InDevelopment />} />
                <Route path="productions" element={<InDevelopment />} />
                <Route path="counts" element={<InDevelopment />} />
              </Route>
              <Route path="tools" element={<Outlet />}>
                <Route path="matrix" element={<InDevelopment />} />
                <Route path="converter" element={<InDevelopment />} />
                <Route path="book" element={<InDevelopment />} />
              </Route>
              <Route path="settings" element={<Outlet />}>
                <Route path="general" element={<SettingsPage />} />
                <Route path="team" element={<InDevelopment />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="areas" element={<AreasPage />} />
                <Route path="warehouses" element={<WarehousesPage />} />
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
