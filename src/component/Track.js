import React from "react";
import "../App.css";

export default function Track({ img, artist, name }) {
  return (
    <table className="card">
      <tbody>
        <tr>
          <td>
            <img className="image-opt" src={img} />
            <h3 className="name">{name}</h3>
            <p className="artist">{artist}</p>

            <div>
              <button className="btn">Select</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
