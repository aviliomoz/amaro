import { BrowserRouter, Route, Routes } from "react-router-dom";
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
            {/* Start */}
            <Route path="/brands" element={<InDevelopment />} />
            <Route path="/user" element={<InDevelopment />} />
            {/* Menu */}
            <Route path="/dashboard" element={<InDevelopment />} />
            <Route path="/register" element={<InDevelopment />} />
            <Route path="/sales" element={<InDevelopment />} />
            <Route path="/monitor" element={<InDevelopment />} />
            <Route path="/customers" element={<InDevelopment />} />
            {/* Items */}
            <Route path="/supplies" element={<SuppliesPage />} />
            <Route path="/subproducts" element={<SubproductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/combos" element={<CombosPage />} />
            <Route path="/packs" element={<InDevelopment />} />
            {/* Logistics */}
            <Route path="/purchases" element={<InDevelopment />} />
            <Route path="/suppliers" element={<InDevelopment />} />
            <Route path="/inventories" element={<InDevelopment />} />
            <Route path="/requirements" element={<InDevelopment />} />
            <Route path="/productions" element={<InDevelopment />} />
            {/* Tools */}
            <Route path="/converter" element={<InDevelopment />} />
            <Route path="/book" element={<InDevelopment />} />
            {/* Settings */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/users" element={<InDevelopment />} />
            <Route path="/branches" element={<InDevelopment />} />
            <Route path="/printers" element={<InDevelopment />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
