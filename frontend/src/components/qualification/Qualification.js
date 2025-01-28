import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState } from "react";
import "animate.css";
import TrackVisibility from "react-on-screen";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import colorSharp from "../../assets/img/color-sharp.png";
export default function Qualification() {
  const [activeTab, setActiveTab] = useState("education");

  const tabs = [
    { id: "education", label: "Education" },
    { id: "Certifications", label: "Certifications" },
    { id: "Experience", label: "Experience" },
  ];

  const data = {
    education: [
      {
        title: "BSc (Hons) in Information Technology Specialising in Information Technology",
        organization: "SLIIT University",
        date: "2021 - Present",
        certificates: true,
      },
      {
        title: "Diploma in English",
        organization: "BWEA",
        date: "2020",
        certificates: true,
      },
      {
        title: "School",
        organization: "Maliyadeva College",
        date: "2006 - 2019",
        certificates: false,
      },
    ],
    Certifications: [
      {
        title: "Full-Stack Web Development",
        organization: "Udemy",
        date: "2022",
        certificates: true,
      },
      {
        title: "AI and Machine Learning",
        organization: "Coursera",
        date: "2021",
        certificates: false,
      },
    ],
    Experience: [
      {
        title: "Tech Lead Volunteer",
        organization: "IEEE Student Branch",
        date: "2020 - 2021",
        certificates: false,
      },
      {
        title: "Community Event Organizer",
        organization: "DevCon",
        date: "2019 - 2020",
        certificates: true,
      },
    ],
  };

  const renderContent = (type) => {
    return data[type].map((item, index) => (
      <div key={index} className="qualification-item">
        <h4>{item.title}</h4>
        <p>{item.organization}</p>
        <p>{item.date}</p>
        {item.certificates && <p>Certificates Available</p>}
      </div>
    ));
  };

  return (
    <section className="qualification" id="qualifications">
      <Container>
        <Row>
          <Col size={12}>
            <div className="qualification-bx">
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h2>Qualifications</h2>
                    <Tab.Container id="qualification-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                      <Nav variant="pills" className="justify-content-center mb-4">
                        {tabs.map((tab) => (
                          <Nav.Item key={tab.id}>
                            <Nav.Link eventKey={tab.id}>{tab.label}</Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                      <Tab.Content>
                        {tabs.map((tab) => (
                          <Tab.Pane eventKey={tab.id} key={tab.id}>
                            <Row>{renderContent(tab.id)}</Row>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                )}
              </TrackVisibility>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background" />
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
}
