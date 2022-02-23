import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      clicked: false,
      favorite: false,
    };

    this.favoritesBehavior = this.favoritesBehavior.bind(this);
    this.addMusic = this.addMusic.bind(this);
    this.removeMusic = this.removeMusic.bind(this);
    this.setNewSate = this.setNewSate.bind(this);
  }

  // Stop loading element, turn clicked true for the checkbox condition and set favorite true or false acording to each click
  setNewSate(favorite) {
    this.setState({
      loading: false,
      clicked: true,
      favorite,
    });
  }

  // Call add or remove function acording to the state of checkbox
  favoritesBehavior({ target }) {
    const favorite = target.checked;
    const { music } = this.props;

    if (favorite) {
      this.addMusic(music, favorite);
    } else {
      this.removeMusic(music, favorite);
    }
  }

  // Remove music whether favorite is true while loading
  removeMusic(music, favorite) {
    this.setState({ loading: true },
      () => removeSong(music)
        .then(() => this.setNewSate(favorite)));
  }

  // Add music whether favorite is false while loading
  addMusic(music, favorite) {
    this.setState({ loading: true },
      () => addSong(music)
        .then(() => this.setNewSate(favorite)));
  }

  render() {
    const { music, favoritesIds } = this.props;
    const { clicked, favorite } = this.state;

    return (
      <div className="mb-5">
        <p>{ music.trackName }</p>
        <audio
          data-testid="audio-component"
          src={ music.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite-check">
          Favorite
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            name="favorite-check"
            type="checkbox"
            onClick={ this.favoritesBehavior }
            checked={ !clicked ? favoritesIds.includes(music.trackId) : favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoritesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
