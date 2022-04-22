import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authToken } from '../../redux/action';

const clientId = 'd816b2f689e44ea888e6c361ec59b7e3';
const scopes = 'playlist-modify-private';
const redirectUri = 'https://spotify-allfelaapk.vercel.app/';

export default function AuthLogin() {
  const dispatch = useDispatch();
  function redirectToSpotify() {
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location = loginUrl;
  }

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get('access_token');
      if (token) {
        dispatch(authToken(token));
      }
    }
  });

  return (
    <div className="flex justify-center my-80">
      <div className="flex flex-col">
        <h1 className="font-extrabold text-xl">
          Let's Login With Your Spotify Account
        </h1>
        <button
          className=" bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 rounded-full px-4 py-2 text-white font-bold w-48 my-4 "
          type="button"
          onClick={redirectToSpotify}
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
}
