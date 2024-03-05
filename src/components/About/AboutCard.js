import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Imadh Ahmed </span>
            from <span className="purple"> Eravur, Batticaloa, Srilanka.</span>
            <br />
            I am a internship trainee at TechCodz PVT LTD.
            <br />
            I am currently pursuing a BSc in IT at Rajarata University of Sri Lanka.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Photography
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Imadh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
