import React, { Component } from "react";
import Track from "../../component/Track";
import "./search.css";
import "../../App.css";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      search: "",
      searchList: [],
    };
  }

  generateRandomString = (length) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  redirectToSpotify() {
    // const authEndpoint = "https://accounts.spotify.com/authorize";
    // const redirectUri = "http://localhost:3000/";
    // const client_id = "d816b2f689e44ea888e6c361ec59b7e3";
    // const scopes = ["user-read-private", "user-read-email"];
    // const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join(
    //   "%20"
    // )}&response_type=token&show_dialog=true
    // `;

    // return loginUrl;
    const state_key = "spotify_auth_state";
    const scopes = "playlist-modify-private";
    let token = this.generateRandomString(16);
    const redirect_uri = "http://localhost:3000/";
    const client_id = "d816b2f689e44ea888e6c361ec59b7e3";

    const loginUrl =
      "https://accounts.spotify.com/authorize?" +
      "client_id=" +
      encodeURIComponent(client_id) +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri) +
      "&scope=" +
      encodeURIComponent(scopes) +
      "&response_type=token&state=" +
      encodeURIComponent(token);

    localStorage.setItem(state_key, token);

    window.location = loginUrl;
  }

  componentDidMount() {
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

    this.setState({ token: token });

    console.log(token);
  }

  handleInput(e) {
    this.setState({ search: e.target.value });
  }

  searchTrack(e) {
    e.preventDefault();

    fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${this.state.search}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => this.setState({ searchList: result.tracks.items }));

    console.log(this.state.token);
  }

  render() {
    // const { token } = this.state;
    // return (
    //   <>
    //     <h1 className="setAuth"> Auth</h1>
    //     <a href={this.redirectToSpotify()}> Click to login</a>
    //     <p>{this.state.token}</p>
    //   </>
    // );

    const { searchList } = this.state;

    const renderItem = () => {
      return (
        searchList &&
        searchList.map((track, index) => (
          <React.Fragment key={index}>
            <Track
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              alt={track.name}
            />
          </React.Fragment>
        ))
      );
    };

    return (
      <>
        <button className="button" onClick={() => this.redirectToSpotify()}>
          SPOTIFY
        </button>

        <form className="form-search" onSubmit={(e) => this.searchTrack(e)}>
          <input
            onChange={(e) => {
              this.handleInput(e);
            }}
            type="text"
            name="search"
            placeholder="Artist, Song, or Album"
            value={this.state.search}
          />
          <input type="submit" value="Search" />
        </form>

        <div className="container">{renderItem()}</div>
      </>
    );
  }
}
