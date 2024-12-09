import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import chatify from "../../Assets/Projects/chatify.png";
import organizer from "../../Assets/Projects/organizer.png";
import age from "../../Assets/Projects/age .jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Portfolio"
              description="I create my portfolio using react js,javascript and bootstrap."
              ghLink="https://github.com/imadhahmed/portfolio.git"
              demoLink="https://imadhahmed.github.io/portfolio/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={organizer}
              isBlog={false}
              title="Personal Organizer"
              description="I create Personal Organizer Application  using C++,.NET Framework."
              ghLink="https://github.com/imadhahmed/personalOrganizer.git"
              demoLink="https://github.com/imadhahmed/personalOrganizer.git"
            />
          </Col>

        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={age}
              isBlog={false}
              title="Age & Gender Detector"
              description="I Create Age & Gender Detector Using Python and OpenCV."
              ghLink="https://github.com/imadhahmed/Age----Gender-Detection"
              demoLink="https://github.com/imadhahmed/Age----Gender-Detection"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
