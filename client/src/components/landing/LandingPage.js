import React from "react";
import { Link } from "react-router-dom";


function Landing() {
  return (
    <StyledHome>
      <h4>
      Hello traveler! Welcome here, my name is Juan David and I am studying
            Full stack development at Henry's Bootcamp. I have created this application so that
            you can find information about any country you want, add tourism
            activities for them, classify them by area, population and some other
            features. Do not hesitate to enter!
      </h4>
      <Link to="/countries" className="button">
        <button>Go!</button>
      </Link>
    </StyledHome>
  );
}

export default Landing;
