
import { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import ProjectCard from './ProjectCard.js';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_BASE_URL } from "../../utils/constants.js";
import { AiOutlineClose } from "react-icons/ai"; // ✅ Close icon

export default function Projects() {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects/fetch`)
      .then(response => {
        const categorized = {};
        response.data.forEach(project => {
          if (!Array.isArray(project.language)) return;
          project.language.forEach(lang => {
            if (!categorized[lang]) categorized[lang] = [];
            categorized[lang].push({
              title: project.title,
              shortDescription: project.shortDescription,
              fullDescription: project.fullDescription,
              demoVideo: project.demoVideo,
              images: project.images.map(img => `${API_BASE_URL}/${img}`),
              language: project.language
            });
          });
        });
        setProjects(categorized);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects: ", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <div className="project-bx">
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h2>Projects</h2>
                    <p>Explore projects categorized by languages and frameworks.</p>
                    <Tab.Container defaultActiveKey={Object.keys(projects)[0]}>
                      <Nav variant="pills" className="nav-pills mb-5 justify-content-center">
                        {Object.keys(projects).map(language => (
                          <Nav.Item key={language}>
                            <Nav.Link eventKey={language}>{language}</Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                      <Tab.Content>
                        {Object.keys(projects).map((lang) => (
                          <Tab.Pane eventKey={lang} key={lang}>
                            <Row>
                              {projects[lang].map((project, index) => (
                                <ProjectCard key={index} {...project} onClick={() => handleCardClick(project)} />
                              ))}
                            </Row>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Tab.Container>
                  </div>}
              </TrackVisibility>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ✅ Modal Popup with Close Icon */}
      {showModal && selectedProject && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.8)", zIndex: 9999,
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "#fff", borderRadius: "8px", padding: "20px", maxWidth: "800px", width: "95%",
            maxHeight: "90vh", overflowY: "auto", position: "relative"
          }}>
            {/* Close Icon */}
            <button onClick={handleCloseModal} style={{
              position: "absolute", top: "0px", right: "15px",
              background: "transparent", border: "none", cursor: "pointer", color: "#333"
            }} title="Close">
              <AiOutlineClose size={24} />
            </button>

            {/* Carousel */}
            <Carousel
  responsive={{ all: { breakpoint: { max: 4000, min: 0 }, items: 1 } }}
  infinite
  autoPlay
  autoPlaySpeed={2500}
  showDots
  arrows={false}
>
  {selectedProject.images.map((img, i) => (
    <a key={i} href={img} target="_blank" rel="noopener noreferrer">
      <img
        src={img}
        alt={`slide-${i}`}
        style={{ width: "100%", height: "300px", objectFit: "cover", cursor: "zoom-in" }}
      />
    </a>
  ))}
</Carousel>


            {/* Project Details */}
            <h3 className="mt-3">{selectedProject.title}</h3>
            <p><strong>Short Description:</strong> {selectedProject.shortDescription}</p>
            {selectedProject.fullDescription && (
              <p><strong>Full Description:</strong> {selectedProject.fullDescription}</p>
            )}
            {selectedProject.demoVideo && (
              <p>
                <strong>Demo Video:</strong>{" "}
                <a href={selectedProject.demoVideo} target="_blank" rel="noreferrer">Watch</a>
              </p>
            )}
            <p><strong>Languages:</strong> {selectedProject.language.join(", ")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
