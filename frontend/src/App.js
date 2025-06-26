
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';
import Skills from './components/skills/Skills';
import Projects from './components/dproject/Projects';
import Qualification from './components/qualification/Qualification';
import Contactus from './components/contactus/Contactus';
import Footer from './components/footer/Footer';
import Login from './components/login/Login'; // Import your Login component
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    
      <div >
        

        <Routes>
          {/* Define your Routes */}
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<Login />} /> {/* Login page route */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          
        </Routes>
      </div>
    
  );
}

// Home component for the Home route
function Home() {
  return (
    <>
      <NavBar /> 
      <Banner />
      <Qualification />
      <Projects />
      <Skills />
      
      
     
      <Contactus />
      <Footer />
    </>
  );
}

export default App;
