import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      album: {},
      loading: false,
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
  }

  // Call getAlbumMusics after component mount
  componentDidMount() {
    this.getAlbumMusics();
  }

  // Get album data
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
        musics: data.splice(1),
      })));
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
      <div data-testid="page-album">
        {loading && <Loading />}
        <Header { ...this.props } />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        { musics.map((song) => <MusicCard key={ song.trackName } music={ song } />) }
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
