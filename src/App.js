import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import Track from "./component/Track";
import dataSpot from "./data/dataSpot";
import React from "react";
import Auth from "./pages/auth/Auth";
import AuthHook from "./pages/auth/AuthHook";
import Home from "./pages/auth/Home";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  // const clientId = process.env.REACT_APP_CLIENT_ID;
  const uniq = dataSpot.filter((track, index, arr) => {
    return arr.map((item) => item.album.id).indexOf(track.album.id) === index;
  });

  return (
    <Provider store={store}>
      <div className="App">
        {/* <Auth /> */}
        <Home />

        {/* <AuthHook /> */}
      </div>
    </Provider>
  );
}

export default App;
