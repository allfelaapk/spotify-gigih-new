import React from "react";

export default function PlaylistItem({ playlist, onClick, children }) {
  return (
    <table className="card">
      <tbody>
        <tr>
          <td>
            <img
              className="image-opt"
              src={playlist.track.album.images[1].url}
            />
            <h3 className="artist">{playlist.track.artists[0].name}</h3>
            <p className="name">{playlist.track.name}</p>

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
}
