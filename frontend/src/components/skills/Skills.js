// import React, { useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import colorSharp from "../../assets/img/color-sharp.png";
// import figmaLogo from "../../assets/img/Figma.png"; 
// import gitLogo from "../../assets/img/Git.png";
// import flutterLogo from "../../assets/img/Flutter.png";
// import pythonLogo from "../../assets/img/Python.png";
// import springBootLogo from "../../assets/img/Spring.png";
// import react from "../../assets/img/React.png";
// import tailwindLogo from "../../assets/img/Tailwind.png";

// export default function Skills() {
//   const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, level: "" });

//   const skills = [
//     { logo: figmaLogo, name: "Figma", level: "Intermediate" },
//     { logo: gitLogo, name: "Git", level: "Advanced" },
//     { logo: flutterLogo, name: "Flutter", level: "Beginner" },
//     { logo: pythonLogo, name: "Python", level: "Expert" },
//     { logo: springBootLogo, name: "Spring Boot", level: "Intermediate" },
//     { logo: react, name: "React Native", level: "Advanced" },
//     { logo: tailwindLogo, name: "Tailwind CSS", level: "Intermediate" },
//   ];

//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   const handleMouseEnter = (e, level) => {
//     const rect = e.target.getBoundingClientRect();
//     setTooltip({
//       visible: true,
//       x: rect.x + rect.width / 2,
//       y: rect.y - 10,
//       level,
//     });
//   };

//   const handleMouseLeave = () => {
//     setTooltip({ visible: false, x: 0, y: 0, level: "" });
//   };

//   return (
//     <section className="skill" id="skills">
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="skill-bx wow zoomIn">
//               <h2>Skills</h2>
//               <p>
//               Proficient in full-stack development with MERN stack, Arduino, Java, PHP, Laravel, Node.js, MongoDB, Firebase, MUI, Python, and Android Studio etc. Skilled in IoT systems, robotics, and data visualization. Strong teamwork and problem-solving expertise
//               </p>
//               <Carousel
//                 responsive={responsive}
//                 infinite={true}
//                 autoPlay={true} // Enable auto-slide
//                 autoPlaySpeed={3000} // Set slide interval (in milliseconds)
//                 className="owl-carousel owl-theme skill-slider"
//               >
//                 {skills.map((skill, index) => (
//                   <div
//                     key={index}
//                     className="item"
//                     onMouseEnter={(e) => handleMouseEnter(e, skill.level)}
//                     onMouseLeave={handleMouseLeave}
//                   >
//                     <img src={skill.logo} alt={skill.name} />
//                     <h5>{skill.name}</h5>
//                   </div>
//                 ))}
//               </Carousel>
//             </div>
//           </div>
//         </div>
//       </div>
//       {tooltip.visible && (
//         <div
//           style={{
//             position: "absolute",
//             left: tooltip.x,
//             top: tooltip.y,
//             transform: "translate(-50%, -100%)",
//             padding: "5px 10px",
//             background: "#000",
//             color: "#fff",
//             borderRadius: "5px",
//             fontSize: "14px",
//             zIndex: 10,
//           }}
//         >
//           {tooltip.level}
//         </div>
//       )}
//       <img className="background-image-left" src={colorSharp} alt="Image" />
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../../assets/img/color-sharp.png";
import { API_BASE_URL } from "../../utils/constants.js";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, level: "" });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/skills`);
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleMouseEnter = (e, level) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.x + rect.width / 2,
      y: rect.y - 10,
      level,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, level: "" });
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>
                Proficient in full-stack development with MERN stack, SQL, Arduino, Java, PHP, Laravel, Node.js, MongoDB, Firebase, MUI, Python, and Android Studio, etc. Skilled in IoT systems, robotics, and data visualization. Strong teamwork and problem-solving expertise.
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                className="owl-carousel owl-theme skill-slider"
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="item"
                    onMouseEnter={(e) => handleMouseEnter(e, skill.level)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img src={`${API_BASE_URL}${skill.logimage}`} alt={skill.l_name} />
                    <h5>{skill.l_name}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            padding: "5px 10px",
            background: "#000",
            color: "#fff",
            borderRadius: "5px",
            fontSize: "14px",
            zIndex: 10,
          }}
        >
          {tooltip.level}
        </div>
      )}
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
}
