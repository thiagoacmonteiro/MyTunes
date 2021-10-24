import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      clicked: false,
      favorite: false,
    };

    this.favoritesBehavior = this.favoritesBehavior.bind(this);
  }

  async favoritesBehavior({ target }) {
    const favorite = target.checked;
    const { music } = this.props;

    this.setState({ loading: true },
      () => addSong(music)
        .then(() => this.setState({
          loading: false,
          clicked: true,
          favorite,
        })));
  }

  render() {
    const { music, favoritesIds } = this.props;
    const { loading, clicked, favorite } = this.state;

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
            onClick={ this.favoritesBehavior }
            checked={ !clicked ? favoritesIds.includes(music.trackId) : favorite }
          />
        </label>
        { loading ? <Loading /> : <p /> }
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
