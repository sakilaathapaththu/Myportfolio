
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../../assets/img/sakila1.png';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import navIcon3 from '../../assets/img/nav-icon3.svg';
import navIcon4 from '../../assets/img/GitHub.svg'
import { HashLink } from 'react-router-hash-link'; // For scrolling to sections
import { Link } from 'react-router-dom'; // For page navigation


export default function NavBar() {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="SAKILA"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={HashLink} to="/#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link as={HashLink} to="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link as={HashLink} to="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            <Nav.Link as={HashLink} to="#qualifications" className={activeLink === 'qualifications' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('qualifications')}>Qualifications</Nav.Link>
            
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/sakila-athapaththu-412647215" target="_blank" rel="noopener noreferrer">
                <img src={navIcon1} alt="LinkedIn" />
              </a>

              <a href="https://www.facebook.com/sakila.atapattu/" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="Facebook" /></a>
              <a href="https://www.instagram.com/__s_a_k_i_l_a__/?hl=en" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="Instagram" /></a>
              <a href="https://github.com/sakilaathapaththu" target="_blank" rel="noopener noreferrer"><img src={navIcon4} alt="Github" /></a>
            </div>
            {/* <HashLink>
                 <button className="vvd"><span>CV</span></button>
            </HashLink> */}
            <a
              href="https://drive.google.com/uc?export=download&id=14Wo0f0U68w0IMhV8Dq5HdKHM4BnCCsGR"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <button className="vvd"><span>CV</span></button>
            </a>

            <HashLink to='#connect'>
                 <button className="vvd"><span>Let’s Connect</span></button>
            </HashLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
