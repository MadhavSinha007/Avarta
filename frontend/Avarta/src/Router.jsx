import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import whatever components you want here

import Home from './pages/Home';
import About from './pages/AboutPage';
import HowItWorks from './pages/howitwork';

const Router = () => {
  return (
    <BrowserRouter>

      {/* <Navbar />  <-- Navbar here would keep it static for all pages.*/}
      <Routes> 
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/howitworks' element={<HowItWorks />} />
     
        
        {/* Add your pages in a Route component like these: */}
        {/* 
        <Route index element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/cats" element={<Categories />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
