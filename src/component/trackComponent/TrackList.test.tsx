import React from 'react';
import TrackList from './TrackList';
import { render, fireEvent, screen } from '@testing-library/react';

test('renders tracklist component', () => {
  render(
    <TrackList
      images="https://i.scdn.co/image/ab67616d0000b273d8f9c9f9d9f9d9f9d9f9d9f9"
      name="name"
      artist="artist"
      onClick={() => {}}
      album="album"
    >
      Test
    </TrackList>
  );
  const button = screen.getByTestId('test-click');
  fireEvent.click(button);
});
