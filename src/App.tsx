import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// Pages 
import { InDevelopment } from "./components/InDevelopment";
import { LoginForm } from "./components/auth/LoginForm";

function App() {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto relative">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<InDevelopment />} />
          </Route>
          <Route element={<AppLayout />}>
            {/* Start */}
            <Route path="/brands" element={<InDevelopment />} />
            <Route path="/user" element={<InDevelopment />} />
            {/* Menu */}
            <Route path="/dashboard" element={<InDevelopment />} />
            <Route path="/items" element={<InDevelopment />} />
            {/* Registry */}
            <Route path="/sales" element={<InDevelopment />} />
            <Route path="/purchases" element={<InDevelopment />} />
            <Route path="/customers" element={<InDevelopment />} />
            <Route path="/suppliers" element={<InDevelopment />} />
            {/* Tools */}
            <Route path="/converter" element={<InDevelopment />} />
            <Route path="/surveys" element={<InDevelopment />} />
            <Route path="/book" element={<InDevelopment />} />
            {/* Logistics */}
            <Route path="/inventories" element={<InDevelopment />} />
            <Route path="/requirements" element={<InDevelopment />} />
            <Route path="/productions" element={<InDevelopment />} />
            <Route path="/counts" element={<InDevelopment />} />
            {/* Filters */}
            <Route path="/categories" element={<InDevelopment />} />
            <Route path="/areas" element={<InDevelopment />} />
            {/* Settings */}
            <Route path="/settings" element={<InDevelopment />} />
            <Route path="/users" element={<InDevelopment />} />
            <Route path="/printers" element={<InDevelopment />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
