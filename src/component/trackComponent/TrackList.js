import React from "react";

const TrackList = ({ images, name, artist, onClick, children }) => {
  return (
    <table className="card">
      <tbody>
        <tr>
          <td>
            <img className="image-opt" src={images} />
            <h3 className="artist">{artist}</h3>
            <p className="name">{name}</p>

            <div>
              <button className="btn" onClick={onClick}>
                {children}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TrackList;
