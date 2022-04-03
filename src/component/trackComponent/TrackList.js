import React, { useEffect, useState } from "react";

const TrackList = ({ track, onClick, children }) => {
  return (
    <table className="card">
      <tbody>
        <tr>
          <td>
            <img className="image-opt" src={track.album.images[1].url} />
            <h3 className="artist">{track.artists[0].name}</h3>
            <p className="name">{track.name}</p>

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
