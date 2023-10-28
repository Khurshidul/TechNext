import React from "react";
import "./Loading.css";
interface PropTypes {}

const Loading: React.FC<PropTypes> = () => {
  return (
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
