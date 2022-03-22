import logo from "./logo.svg";
import "./App.css";
import data from "./data";

function App() {
  // const clientId = process.env.REACT_APP_CLIENT_ID;
  return (
    // <div className="App">
    <div className="container">
      <img src={data.album.images[1].url} />

      <h1 className="artist">{data.album.artists[0].name}</h1>

      <p className="name">{data.album.name}</p>
      <button className="btn">Select</button>
    </div>
    // </div>
  );
}

export default App;
