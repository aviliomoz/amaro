import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// Pages 
import { InDevelopment } from "./components/InDevelopment";
import { LoginForm } from "./components/auth/LoginForm";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { ItemsPage } from "./pages/ItemsPage";
import { ItemPage } from "./pages/ItemPage";
import { RestaurantLayout } from "./layouts/RestaurantLayout";
import { ConverterPage } from "./pages/ConverterPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CategoriesPage } from "./pages/CategoriesPage";

function App() {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto relative">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/user" element={<InDevelopment />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:slug" element={<RestaurantLayout />}>
              <Route path="dashboard" element={<InDevelopment />} />
              <Route path="sales" element={<InDevelopment />} />
              <Route path="customers" element={<InDevelopment />} />
              <Route path="items/:type" element={<ItemsPage />} />
              <Route path="items/:type/:id" element={<ItemPage />} />
              <Route path="converter" element={<ConverterPage />} />
              <Route path="surveys" element={<InDevelopment />} />
              <Route path="menus" element={<InDevelopment />} />
              <Route path="shop" element={<InDevelopment />} />
              <Route path="charts" element={<InDevelopment />} />
              <Route path="reports" element={<InDevelopment />} />
              <Route path="purchases" element={<InDevelopment />} />
              <Route path="suppliers" element={<InDevelopment />} />
              <Route path="inventories" element={<InDevelopment />} />
              <Route path="requirements" element={<InDevelopment />} />
              <Route path="productions" element={<InDevelopment />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="settings/categories" element={<CategoriesPage />} />
              <Route path="users" element={<InDevelopment />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
