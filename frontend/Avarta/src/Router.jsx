import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import HowItWorks from "./pages/howitwork";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Analyzer from "./pages/product";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/analyzer"
          element={
            <ProtectedRoute>
              <Analyzer />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
