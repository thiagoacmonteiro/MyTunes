import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loading: false,
    };

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  addToFavorites({ target }) {
    const favorite = target.checked;
    const {
      music:
       { trackId },
    } = this.props;

    this.setState({ loading: true },
      () => addSong(trackId).then(() => this.setState({
        favorite,
        loading: false,
      })));
  }

  render() {
    const { music } = this.props;
    const { loading, favorite } = this.state;

    return (
      <div>
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
          Favorita
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            name="favorite-check"
            type="checkbox"
            onClick={ this.addToFavorites }
            checked={ favorite }
          />
        </label>
        { loading ? <Loading /> : <p /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
