import React from 'react';
import '../../App.css';

type TrackListProps = {
  images: string;
  name: string;
  artist: string;
  // onClick: () => void;
  onClick: () => void;
  children: React.ReactNode;
  album: string;
  duration: string;
};

function TrackList(props: TrackListProps) {
  const { images, name, artist, onClick, children, album, duration } = props;
  return (
    <table className="card">
      <tbody>
        <tr>
          <td className="card-list">
            <img className="image-opt" src={images} alt="this-images" />
            <div className="card-track">
              <div className="card-title">
                <h1 className="artist">{artist}</h1>
                <h3 className="name">{name}</h3>
              </div>
              <div className="track-bottom">
                <p className="album-name">{album}</p>
                <p className="durate-playlist">{duration}</p>
                <button
                  className="btn"
                  type="button"
                  data-testid="test-click"
                  onClick={onClick}
                >
                  {children}
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TrackList;
