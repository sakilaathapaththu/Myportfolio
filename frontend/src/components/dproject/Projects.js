// import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
// import ProjectCard from "./ProjectCard.js";
// import projImg1 from "../../assets/img/project-img1.png";
// import projImg2 from "../../assets/img/project-img2.png";
// import projImg3 from "../../assets/img/project-img3.png";
// import colorSharp2 from "../../assets/img/color-sharp2.png";
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';

// export default function Projects() {
//   const projects = {
//     php: [
//       {
//         title: "PHP Project 1",
//         description: "Backend Development",
//         imgUrl: projImg1,
//       },
//       {
//         title: "PHP Project 2",
//         description: "Web Application",
//         imgUrl: projImg2,
//       },
//     ],
//     java: [
//       {
//         title: "Java Project 1",
//         description: "Desktop Application",
//         imgUrl: projImg3,
//       },
//       {
//         title: "Java Project 2",
//         description: "Backend Development",
//         imgUrl: projImg1,
//       },
//     ],
//     react: [
//       {
//         title: "React Project 1",
//         description: "Frontend Development",
//         imgUrl: projImg2,
//       },
//       {
//         title: "React Project 2",
//         description: "Web Application",
//         imgUrl: projImg3,
//       },
//     ],
//     mern: [
//       {
//         title: "MERN Project 1",
//         description: "Full-Stack Application",
//         imgUrl: projImg1,
//       },
//       {
//         title: "MERN Project 2",
//         description: "E-Commerce Development",
//         imgUrl: projImg2,
//       },
//     ],
//     springboot: [
//       {
//         title: "Spring Boot Project 1",
//         description: "Microservices Architecture",
//         imgUrl: projImg3,
//       },
//       {
//         title: "Spring Boot Project 2",
//         description: "Backend API Development",
//         imgUrl: projImg1,
//       },
//     ],
//     android: [
//       {
//         title: "Android Studio Project 1",
//         description: "Mobile App Development",
//         imgUrl: projImg2,
//       },
//       {
//         title: "Android Studio Project 2",
//         description: "Game Development",
//         imgUrl: projImg3,
//       },
//     ],
//     laravel: [
//       {
//         title: "Laravel Project 1",
//         description: "CMS Development",
//         imgUrl: projImg1,
//       },
//       {
//         title: "Laravel Project 2",
//         description: "E-Commerce Application",
//         imgUrl: projImg2,
//       },
//     ],
//     flutter: [
//       {
//         title: "Flutter Project 1",
//         description: "Cross-Platform App",
//         imgUrl: projImg3,
//       },
//       {
//         title: "Flutter Project 2",
//         description: "UI/UX Focused App",
//         imgUrl: projImg1,
//       },
//     ],
//     python: [
//       {
//         title: "Python ML Project 1",
//         description: "Machine Learning Model",
//         imgUrl: projImg2,
//       },
//       {
//         title: "Python ML Project 2",
//         description: "Data Analysis Toolkit",
//         imgUrl: projImg3,
//       },
//     ],
//   };

//   return (
//     <section className="project" id="projects">
//       <Container>
//         <Row>
//           <Col size={12}>
//             <div className="project-bx">
//               <TrackVisibility>
//                 {({ isVisible }) =>
//                   <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                     <h2>Projects</h2>
//                     <p>Explore projects categorized by programming languages and frameworks. Click on each tab to view relevant projects.</p>
//                     <Tab.Container id="projects-tabs" defaultActiveKey="php">
//                       <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
//                         <Nav.Item><Nav.Link eventKey="php">PHP</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="java">Java</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="react">React</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="mern">MERN</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="springboot">Spring Boot</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="android">Android Studio</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="laravel">Laravel</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="flutter">Flutter</Nav.Link></Nav.Item>
//                         <Nav.Item><Nav.Link eventKey="python">Python with ML</Nav.Link></Nav.Item>
//                       </Nav>
//                       <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
//                         {Object.keys(projects).map((category) => (
//                           <Tab.Pane eventKey={category} key={category}>
//                             <Row>
//                               {projects[category].map((project, index) => (
//                                 <ProjectCard key={index} {...project} />
//                               ))}
//                             </Row>
//                           </Tab.Pane>
//                         ))}
//                       </Tab.Content>
//                     </Tab.Container>
//                   </div>}
//               </TrackVisibility>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <img className="background-image-right" src={colorSharp2} alt="background" />
//     </section>
//   );
// }
import { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import ProjectCard from './ProjectCard.js';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import axios from 'axios';
import { API_BASE_URL } from "../../utils/constants.js";

export default function Projects() {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your backend
    axios.get(`${API_BASE_URL}/api/projects/fetch`)
      .then(response => {
        const projectsData = response.data;
        const categorizedProjects = categorizeProjects(projectsData);
        setProjects(categorizedProjects);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects: ", error);
        setLoading(false);
      });
  }, []);

  // Function to categorize projects based on their language
  const categorizeProjects = (projectsData) => {
    const categorized = {};

    projectsData.forEach(project => {
      const { language } = project;
      if (!categorized[language]) {
        categorized[language] = [];
      }
      categorized[language].push({
        title: project.title,
        description: project.shortDescription,
        imgUrl: `${API_BASE_URL}/${project.images[0]}`,  // Construct the full image URL
      });
    });

    return categorized;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                    <p>Explore projects categorized by programming languages and frameworks. Click on each tab to view relevant projects.</p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="php">
                      <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                        {Object.keys(projects).map(language => (
                          <Nav.Item key={language}>
                            <Nav.Link eventKey={language}>{language}</Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                      <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        {Object.keys(projects).map((category) => (
                          <Tab.Pane eventKey={category} key={category}>
                            <Row>
                              {projects[category].map((project, index) => (
                                <ProjectCard key={index} {...project} />
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
    </section>
  );
}
