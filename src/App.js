import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import Track from "./component/Track";
import dataSpot from "./data/dataSpot";
import React from "react";
import Auth from "./pages/auth/Auth";

function App() {
  // const clientId = process.env.REACT_APP_CLIENT_ID;
  const uniq = dataSpot.filter((track, index, arr) => {
    return arr.map((item) => item.album.id).indexOf(track.album.id) === index;
  });

  return (
    <div className="App">
      {/* <div className="container">
        
        />
      </div> */}
      {/* <Track
        img={data.album.images[1].url}
        artist={data.album.artists[0].name}
        name={data.album.name}
      /> */}
      {/* <div className="container">
        {uniq.map((track) => (
          <React.Fragment key={track.album.id}>
            <Track
              img={track.album.images[1].url}
              artist={track.album.artists[0].name}
              name={track.album.name}
            />
          </React.Fragment>
        ))}
      </div> */}
      <Auth />
    </div>
  );
}

export default App;
