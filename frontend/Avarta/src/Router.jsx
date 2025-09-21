import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/AboutPage';
import HowItWorks from './pages/howitwork';
import Login from './auth/Login';
import Register from './auth/Register';
import Analyzer from './pages/product';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const Router = () => {
  return (
    <BrowserRouter>
      <Routes> 
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/howitworks' element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}  />
        <Route 
          path="/analyzer" 
          element={
            <ProtectedRoute>
              <Analyzer />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;