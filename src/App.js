import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import Track from "./component/Track";

function App() {
  // const clientId = process.env.REACT_APP_CLIENT_ID;
  return (
    <div className="App">
      {/* <div className="container">
        
        />
      </div> */}
      <Track
        img={data.album.images[1].url}
        artist={data.album.artists[0].name}
        name={data.album.name}
      />
    </div>
  );
}

export default App;
