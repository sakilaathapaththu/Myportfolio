import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import contactImg from "../../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
export default function Contactus() {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      }
      const [formDetails, setFormDetails] = useState(formInitialDetails);
      const [buttonText, setButtonText] = useState('Send');
      const [status, setStatus] = useState({});
    
      const onFormUpdate = (category, value) => {
          setFormDetails({
            ...formDetails,
            [category]: value
          })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = await response.json();
        setFormDetails(formInitialDetails);
        if (result.code == 200) {
          setStatus({ succes: true, message: 'Message sent successfully'});
        } else {
          setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
        }
      };
    
  return (
    <section className="contact" id="connect">
       
      <Container>
      <h2>Contact Us</h2>
        <Row >
       
          <Col size={12} md={6}>
            <TrackVisibility>
            {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                
                
               
        <Row >
        <div className="contact01">
            
           
          <Col size={12} sm={12} className="px-1">
            <div className="contact-item d-flex ">
              <FaEnvelope className="me-3" size={20} />
              <span>
                <a href="mailto:sakila.atapattu@gmail.com" className="text-white text-decoration-none">
                sakila.atapattu@gmail.com
                </a>
              </span>
            </div>
          </Col>
          <Col size={12} sm={12} className="px-1">
            <div className="contact-item d-flex ">
              <FaPhoneAlt className="me-3" size={20} />
              <span>
                <a href="tel:+94714782241" className="text-white text-decoration-none">
                  +94 71 478 2241
                </a>
              </span>
            </div>
          </Col>
          <Col size={12} sm={12} className="px-1">
            <div className="contact-item d-flex ">
              <FaMapMarkerAlt className="me-3" size={20} />
              <span>Rajagedra, Ahugoda, Pothuhera</span>
            </div>
          </Col>
          <Col size={12} sm={12} className="px-1">
            <div className="contact-item d-flex ">
              <FaGithub className="me-3" size={20} />
              <span>
                <a
                  href="https://github.com/sakilaathapaththu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  github.com/sakilaathapaththu
                </a>
              </span>
            </div>
          </Col>
          <Col size={12} sm={12} className="px-1">
            <div className="contact-item d-flex ">
            <FaLinkedin className="me-3" size={20} />
              <span>
                <a
                  href="www.linkedin.com/in/sakila-athapaththu-412647215"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  linkedin.com/sakilaathapaththu
                </a>
              </span>
            </div>
          </Col>
          
          <Col size={12} className="px-1">
            <div className="contact-item d-flex ">
              <FaWhatsapp className="me-3" size={20} />
              <span>
                <a
                  href="https://wa.me/714782241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  Chat on WhatsApp
                </a>
              </span>
            </div>
          </Col>
          </div>
        </Row>
               
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
