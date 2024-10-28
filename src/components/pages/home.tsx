import React from "react";
import "../../css/home.css";
import Name from "../home-content/name";

const Home = () => {
  return (
    <div className="home">
      <div className="pic-name-container">
        <Name />
      </div>
    </div>
  );
};

export default Home;
