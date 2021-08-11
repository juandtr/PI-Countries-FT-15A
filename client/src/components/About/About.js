import React from "react";
import Postgres from "../../img/postgres.png";
import ReactLogo from "../../img/react.png";
import Express from "../../img/express.png";
import Node from "../../img/node.png";
import Redux from "../../img/redux.png";

function About() {
  return (
    <AboutDiv>
      <h1>About this website:</h1>
      <h4>
      Este sitio web es mi proyecto individual en el campo de entrenamiento de Henry. Ha sido
         construido con PostgreSQL para la base de datos, Node y Express para la parte posterior
          y React / Redux para la interfaz. Todo el estilismo se hizo con
         CSS puro usando la biblioteca de componentes con estilo. <br />
         Consume datos de los siguientes{" "}
        <a href="https://restcountries.eu/">API</a>
      </h4>
      <div className="pern">
        <a href="https://www.postgresql.org/">
          <img src={Postgres} width="50" heigth="50" className="pernIcon" />
        </a>
        <a href="https://expressjs.com/">
          <img src={Express} width="150" height="50" className="pernIcon" />
        </a>
        <a href="https://redux.js.org/">
          <img src={Redux} width="60" height="50" className="pernIcon" />
        </a>
        <a href="https://reactjs.org/">
          <img src={ReactLogo} width="60" height="50" className="pernIcon" />
        </a>
        <a href="https://nodejs.org/">
          <img src={Node} width="80" height="50" className="pernIcon" />
        </a>
      </div>
    </AboutDiv>
  );
}

export default About;
