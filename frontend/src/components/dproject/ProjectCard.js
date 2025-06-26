
import React from 'react';
import { Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ProjectCard({ title, shortDescription, images, onClick }) {
  const responsive = {
    all: { breakpoint: { max: 4000, min: 0 }, items: 1 }
  };

  return (
    <Col size={12} sm={6} md={4} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="proj-imgbx" style={{
        width: "100%", height: "250px", position: "relative", borderRadius: "8px", overflow: "hidden"
      }}>
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500} showDots arrows={false}>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={title} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
          ))}
        </Carousel>
        <div className="proj-txtx" style={{
          position: "absolute", bottom: 0, background: "rgba(0,0,0,0.6)",
          color: "white", width: "100%", padding: "10px"
        }}>
          <h4>{title}</h4>
          <span>{shortDescription}</span>
        </div>
      </div>
    </Col>
  );
}
