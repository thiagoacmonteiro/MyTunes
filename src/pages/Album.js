import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      album: {},
      loading: false,
      favoritesIds: [],
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
    this.checkBoxBehavior = this.checkBoxBehavior.bind(this);
  }

  // Call getAlbumMusics after component mount
  componentDidMount() {
    this.getAlbumMusics();
  }

  // Get album data and set album name and musics list
  getAlbumMusics() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.setState({ loading: true },
      () => getMusics(id).then((data) => this.setState({
        loading: false,
        album: data[0],
        musics: data.slice(1, data.length),
      }))
        .then(() => this.checkBoxBehavior()));
  }

  async checkBoxBehavior() {
    const favoriteSongs = await getFavoriteSongs();
    const favoritesIds = await favoriteSongs.map((song) => song.trackId);

    this.setState({
      favoritesIds,
    });
  }

  render() {
    const {
      album: {
        artistName,
        collectionName,
      },
    } = this.state;

    const { musics, loading } = this.state;

    return (
      <div
        className={`flex flex-col ${musics.length > 8 ? 'h-full' : 'h-screen'} w-screen
          bg-gradient-to-t from-cyan-500 to-emerald-500 items-center z-30`}
        data-testid="page-album">
        {loading && <Loading />}
        <Header { ...this.props } />
        <p className="mt-5 mb-3 text-emerald-900 font-semibold text-3xl" data-testid="artist-name">{ artistName }</p>
        <p className="mb-5 text-emerald-900 font-semibold text-xl" data-testid="album-name">{ collectionName }</p>
        { musics.map((song) => (
          <MusicCard
            { ...this.state }
            key={ song.trackName }
            music={ song }
          />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
