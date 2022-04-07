import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import TrackList from "../../component/trackComponent/TrackList";
import { authToken } from "../../redux/action";

export default function Home() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [combine, setCombine] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // *untuk mendapatkan current user
  const [isUser, setUser] = useState("");

  // * untuk membuat playlist
  const [isPlaylist, setPlaylist] = useState([]);

  // * Add track to playlist
  const [trackPlaylist, setTrackPlaylist] = useState([]);
  const [inputPlaylist, setInputPlaylist] = useState({
    title: "",
    description: "",
  });

  //* function untuk mengambil api dari spotify untuk membuat playlist
  const createPlaylist = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/users/${isUser.id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: inputPlaylist.title,
        description: inputPlaylist.description,
        public: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaylist(data);
      });
  };

  const handleClick = (track) => {
    const alreadySelected = selected.find((item) => item.id === track.id);

    if (alreadySelected) {
      setSelected(selected.filter((item) => item.id !== track.id));
    } else {
      setSelected([...selected, track]);
    }
  };

  //* useEffect berfungsi untuk merender ulang component
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => result);
      setUser(response);
      console.log(response);
    };
    getUsers();
  }, [token]);

  //* useEffect ini berfungsi untuk menggabungkan state selected list dan search result
  useEffect(() => {
    const combineTrack = searchResults.map((track) => ({
      ...track,
      isSelected: selected.find((item) => item.id === track.id),
    }));
    setCombine(combineTrack);
  }, [selected, searchResults]);

  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  const handleInputPlaylist = (e) => {
    const { name, value } = e.target;
    setInputPlaylist({ ...inputPlaylist, [name]: value });
  };

  const addToPlaylist = async () => {
    const url = `https://api.spotify.com/v1/playlists/${isPlaylist.id}/tracks`;
    const track = selected.map((elem) => elem.uri);
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: track,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    await fetch(
      `https://api.spotify.com/v1/playlists/${isPlaylist.id}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application.json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrackPlaylist(data.items);
      });
    setSelected([]);
  };

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
  if (token === "") {
    return <Redirect to="/login" />;
  }
  const renderItem = () => {
    return (
      combine &&
      combine.map((track, index) => (
        <React.Fragment key={index}>
          <TrackList
            images={track.album.images[1].url}
            name={track.name}
            artist={track.artists[0].name}
            onClick={() => handleClick(track)}
          >
            {track.isSelected ? "Deselect" : "Select"}
          </TrackList>
        </React.Fragment>
      ))
    );
  };
  console.log(trackPlaylist);
  return (
    <>
      <h1> Create playlist</h1>

      <p>Name: {isUser.display_name}</p>
      <p>ID: {isUser.id}</p>
      <form className="playlistForm" onSubmit={createPlaylist}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          maxLength="10"
          onChange={handleInputPlaylist}
          value={inputPlaylist.title}
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleInputPlaylist}
          value={inputPlaylist.description}
        />
        <input type="submit" value="Create Playlist" />
      </form>

      <h1>{isPlaylist.name} Playlist</h1>
      <h3>{isPlaylist.description}</h3>
      <div className="container">
        {trackPlaylist.map((item, index) => (
          <React.Fragment key={item.track.id}>
            <TrackList
              images={item.track.album.images[1].url}
              name={item.track.name}
              artist={item.track.artists[0].name}
            >
              Play
            </TrackList>
          </React.Fragment>
        ))}
      </div>

      <button className="button" onClick={logout}>
        {" "}
        Logout
      </button>

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
        {selected.map((track, index) => (
          <React.Fragment key={index}>
            <TrackList
              images={track.album.images[1].url}
              name={track.name}
              artist={track.artists[0].name}
              onClick={() => handleClick(track)}
            >
              {" "}
              Deselect
            </TrackList>
          </React.Fragment>
        ))}
      </div>
      {selected.length === 0 ? null : (
        <button onClick={addToPlaylist}>Save to Playlist</button>
      )}
      <div className="container">{renderItem()}</div>
    </>
  );
}
