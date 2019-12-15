import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultName } from "../../settings";

const Banner = props => {
  return (
    <div className="d-flex align-items-center mb-2">
      <FontAwesomeIcon icon="user-astronaut" size="3x"></FontAwesomeIcon>
      <h3 className="display-4">{props.name || defaultName}</h3>
    </div>
  );
};

export default Banner;
