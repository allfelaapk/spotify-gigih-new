import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Track from "../../component/Track";
import { authToken } from "../../redux/action";

export default function AuthHook() {
  // const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  function redirectToSpotify() {
    const client_id = "d816b2f689e44ea888e6c361ec59b7e3";
    const scopes = "playlist-modify-private";
    const redirect_uri = "http://localhost:3000/";
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location = loginUrl;
    // return loginUrl;
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    dispatch(authToken(token));

    console.log(token);
  }, [token]);

  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify({}));
    }
  }, []);

  const searchTrack = (e) => {
    e.preventDefault();

    fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${searchKey}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setSearchResults(result.tracks.items));

    console.log(token);
  };

  function logout() {
    dispatch(authToken(""));
    window.localStorage.removeItem("token");
  }

  const renderItem = () => {
    return (
      searchResults &&
      searchResults
        .filter((item) => !(item.id in selected))
        .map((track, index) => (
          <React.Fragment key={index}>
            <Track track={track} />
          </React.Fragment>
        ))
    );
  };

  let selected = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      {!token ? (
        <button className="button" onClick={redirectToSpotify}>
          SPOTIFY
        </button>
      ) : (
        <button className="button" onClick={logout}>
          {" "}
          Logout
        </button>
      )}

      {token && (
        <>
          <form className="form-search" onSubmit={searchTrack}>
            <input
              className="searchInput"
              onChange={handleInput}
              type="text"
              name="search"
              placeholder="Artist, Song, or Album"
              value={searchKey}
            />
            <input className="searchSubmit" type="submit" value="Search" />
          </form>

          <div className="container">
            {selected &&
              Object.values(selected).map((track, index) => (
                <React.Fragment key={index}>
                  <Track track={track} />
                </React.Fragment>
              ))}
          </div>
          <div className="container">{renderItem()}</div>
        </>
      )}
    </>
  );
}
