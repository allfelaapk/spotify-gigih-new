import React from "react";
import "../../src/App.css";

export default function Track({ img, artist, name }) {
  return (
    <div className="container">
      <img className="image-opt" src={img} />
      <h3 className="name">{name}</h3>
      <p className="artist">{artist}</p>

      <div>
        <button className="btn">Select</button>
      </div>
    </div>
  );
}
