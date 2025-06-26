
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import emailjs from 'emailjs-com';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export default function Contactus() {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (field, value) => {
    setFormDetails({ ...formDetails, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    const templateParams = {
      firstName: formDetails.firstName,
      lastName: formDetails.lastName,
      email: formDetails.email,
      phone: formDetails.phone,
      message: formDetails.message,
    };

    emailjs.send(
      'service_iz4upso',           // ✅ Your actual Service ID
      'template_igzmdar',          // ✅ Your actual Template ID
      templateParams,
      'Saxc69ddljcENyxEM'          // ✅ Your actual Public Key (User ID)
    ).then(() => {
      setStatus({ success: true, message: "Message sent successfully" });
      setFormDetails(formInitialDetails);
      setButtonText("Send");
    }).catch(() => {
      setStatus({ success: false, message: "Failed to send message. Try again later." });
      setButtonText("Send");
    });
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <h2>Contact Us</h2>
        <Row>
          <Col md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} required />
                      </Col>
                      <Col sm={6} className="px-1">
                        <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} required />
                      </Col>
                      <Col sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} required />
                      </Col>
                      <Col sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </Col>
                      <Col sm={12} className="px-1">
                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} required />
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {
                        status.message &&
                        <Col>
                          <p className={status.success ? "text-success" : "text-danger"}>{status.message}</p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>

          <Col md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <Row>
                    <div className="contact01">
                      <Col className="px-1">
                        <div className="contact-item d-flex">
                          <FaEnvelope className="me-3" size={20} />
                          <span><a href="mailto:sakila.atapattu@gmail.com">sakila.atapattu@gmail.com</a></span>
                        </div>
                      </Col>
                      <Col className="px-1">
                        <div className="contact-item d-flex">
                          <FaPhoneAlt className="me-3" size={20} />
                          <span><a href="tel:+94714782241">+94 71 478 2241</a></span>
                        </div>
                      </Col>
                      <Col className="px-1">
                        <div className="contact-item d-flex">
                          <FaMapMarkerAlt className="me-3" size={20} />
                          <span>Rajagedra, Ahugoda, Pothuhera</span>
                        </div>
                      </Col>
                      <Col className="px-1">
                        <div className="contact-item d-flex">
                          <FaGithub className="me-3" size={20} />
                          <span><a href="https://github.com/sakilaathapaththu" target="_blank" rel="noreferrer">GitHub</a></span>
                        </div>
                      </Col>
                      <Col className="px-1">
                        <div className="contact-item d-flex">
                          <FaLinkedin className="me-3" size={20} />
                          <span><a href="https://www.linkedin.com/in/sakila-athapaththu-412647215" target="_blank" rel="noreferrer">LinkedIn</a></span>
                        </div>
                      </Col>
                      <Col className="px-1">
                        <div className="contact-item d-flex">
                          <FaWhatsapp className="me-3" size={20} />
                          <span><a href="https://wa.me/714782241" target="_blank" rel="noreferrer">Chat on WhatsApp</a></span>
                        </div>
                      </Col>
                    </div>
                  </Row>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
