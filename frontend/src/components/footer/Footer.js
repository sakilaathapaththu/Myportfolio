import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/GitHub.svg';
import navIcon3 from '../../assets/img/nav-icon3.svg';
import profile from '../../assets/img/profile.png'

import Login from "../login/Login";
export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
         
          <Col size={12} sm={6}>
            {/* <img src={logo} alt="Logo" /> */}
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end mt-3">
            <div className="social-icon">
              <a href="https://github.com/sakilaathapaththu" target="_blank"><img src={navIcon2} alt="" /></a>
              <a href="www.linkedin.com/in/sakila-athapaththu-412647215" target="_blank"><img src={navIcon1} alt="" /></a>
              <a href="https://wa.me/714782241" target="_blank"><img src={navIcon3} alt="" /></a>
              <a href="/login" target="_blank" ><img src={profile} alt="Login" /></a>
               
              
            </div>
            <p>Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
