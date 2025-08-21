import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { PosLayout } from "./layouts/PosLayout";
import { RestaurantLayout } from "./layouts/RestaurantLayout";

// Pages 
import { InDevelopment } from "./components/InDevelopment";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { ItemsPage } from "./pages/ItemsPage";
import { ItemPage } from "./pages/ItemPage";
import { ConverterPage } from "./pages/ConverterPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { LocalSalesPage } from "./pages/LocalSalesPage";
import { AuthPage } from "./pages/AuthPage";
import { PosHomePage } from "./pages/PosHomePage";

function App() {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto relative px-4">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
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

          <Route path="/pos" element={<PosLayout />} >
            <Route path="registers" element={<PosHomePage />} />
            <Route path="halls" element={<LocalSalesPage />} />
            <Route path="orders" element={<PosHomePage />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
