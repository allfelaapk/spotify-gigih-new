import React from 'react';
import { Outlet } from 'react-router-dom';
import SpotifyLogo from '../assets/spotify-icon.svg';
export default function HeaderSpot() {
  return (
    <>
      <div className="px-2 py-2  bg-green-600 sticky top-0">
        <div className="flex flex-row font-extrabold text-xl">
          Spotify
          <img className="w-5 h-5" src={SpotifyLogo} alt="Spotify" />
        </div>
        <div></div>
      </div>
      <Outlet />
    </>
  );
}
