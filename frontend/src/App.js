import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/Navbar.js';
import Banner from './components/banner/Banner.js';
import Skills from './components/skills/Skills.js';
import Projects from './components/dproject/Projects.js';
import Qualification from './components/qualification/Qualification.js';
import Contactus from './components/contactus/Contactus.js';
import Footer from './components/footer/Footer.js';
function App() {
  return (
    <div className="App">
     <NavBar/>
     <Banner/>
     <Skills/>
     <Projects/>
     <Qualification/>
     <Contactus/>
     <Footer/>
    </div>
  );
}

export default App;
