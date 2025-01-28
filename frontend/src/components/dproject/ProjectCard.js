import React from 'react'
import { Col } from "react-bootstrap";

export default function ProjectCard({ title, description, imgUrl }) {
  return (
    <Col size={12} sm={6} md={4}>
    <div className="proj-imgbx" style={{ width: "300px", height: "200px" }}>
    <img src={imgUrl} alt={title} />
      <div className="proj-txtx">
        <h4>{title}</h4>
        <span>{description}</span>
      </div>
    </div>
  </Col>
  )
}
