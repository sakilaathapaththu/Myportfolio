


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import colorSharp from "../../assets/img/color-sharp.png";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { API_BASE_URL } from "../../utils/constants";

export default function Qualification() {
  const [activeTab, setActiveTab] = useState("education");
  const [data, setData] = useState({ education: [], certification: [], experience: [] });

  const tabs = [
    { id: "education", label: "Education" },
    { id: "certification", label: "Certifications" },
    { id: "experience", label: "Experience" },
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/qualifications`)
      .then((res) => res.json())
      .then((qualifications) => {
        const grouped = { education: [], certification: [], experience: [] };

        qualifications.forEach((item) => {
          const key = item.type.toLowerCase(); // normalize type
          if (grouped[key]) {
            grouped[key].push({
              title: item.title,
              organization: item.organization,
              date: `${item.startDate?.slice(0, 7)} - ${item.endDate?.slice(0, 7)}`,
              startDate: item.startDate,
              description: item.description,
              certificateLink: item.certificateLink,
            });
          }
        });

        // Sort by startDate (descending)
        Object.keys(grouped).forEach((key) => {
          grouped[key].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        });

        setData(grouped);
      })
      .catch((err) => console.error("Failed to fetch qualifications", err));
  }, []);

  const renderTimeline = (type) => {
    const items = data[type];
    if (!items || items.length === 0) {
      return <Typography>No {type} qualifications available.</Typography>;
    }

     return (
      <Timeline position="alternate">
        {items.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              {index < items.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <h4>{item.title}</h4>
              <p>{item.organization}</p>
              <p>{item.date}</p>

              {/* Display description for experience */}
              {type === "experience" && item.description && (
                <p><strong>Description:</strong> {item.description}</p>
              )}

              {/* Display certificate link for certification */}
              {type === "certification" && item.certificateLink && (
                <p>
                  <strong>Certificate:</strong>{" "}
                  <a href={item.certificateLink} target="_blank" rel="noreferrer">
                    View Certificate
                  </a>
                </p>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
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
                            <Row>{renderTimeline(tab.id)}</Row>
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

