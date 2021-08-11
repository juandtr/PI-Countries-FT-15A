import React from "react";
import Clock from "../../../img/clock.png";

function Activity({ name, duration, season, difficulty, edit }) {
  let stars = [];
  for (let i = 1; i <= difficulty; i++) {
    stars.push(i);
  }
  return (
    <StyledActivity>
      {edit ? <span>These are current values</span> : null}
      <h1 id="nombre">{name}</h1>
      <div className="iconedProp">
        <img src={Clock} width="15" height="15" />
        <h4>{duration} min</h4>
      </div>
      <div className="infoDiv">
        <h4>{season}</h4>
        <div>
          {stars.map((el) => (
            <img
              src="https://image.flaticon.com/icons/png/512/1828/1828665.png"
              width="10"
              height="10"
              className="cross"
            />
          ))}
        </div>
      </div>
    </StyledActivity>
  );
}

export default Activity;
