import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NotFound from './NotFound';

class Search extends React.Component {
  render() {
    const {
      searchButtonState,
      onInputChange,
      searchInput,
      searchAlbum,
      getAlbums,
      artistName,
      albums,
    } = this.props;

    return (
      <div
        className="flex flex-col items-center h-screen w-screen
          bg-gradient-to-t from-cyan-500 to-emerald-500"
        data-testid="page-search"
      >
        <Header />
        <form className="mt-3 flex flex-col items-center">
          <input
            className="rounded-md"
            type="text"
            data-testid="search-artist-input"
            placeholder="Artist name"
            name="searchInput"
            value={ searchInput }
            onChange={ onInputChange }
          />
          <button
            className="mt-2 rounded-md w-20 bg-emerald-600 text-white font-bold"
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButtonState }
            onClick={ searchAlbum }
          >
            Search
          </button>
          {/* Condition to display according to the state of the array of albums */}
          { getAlbums ? (
            <div className="flex flex-col items-center mt-4">
              <p className="mb-4">
                {`Results for albuns of: ${artistName}`}
              </p>
              <div
                className="flex flex-wrap
                  bg-gradient-to-t from-cyan-500 to-emerald-500 h-full"
              >
                {/* Map results using collection id and name */}
                { albums.map((album) => (
                  <Link
                    className="w-32 h-40 m-8 bg-white rounded-md drop-shadow-xl"
                    key={ album.collectionId }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img
                      className="rounded-md w-32"
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                    />
                    <p
                      className="text-md truncate w-32 text-center"
                    >
                      { album.collectionName }
                    </p>
                  </Link>)) }
              </div>
            </div>
          ) : (
            <p />) }
          { !getAlbums && artistName.length > 0
            ? <NotFound /> : <p /> }
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchButtonState: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  searchAlbum: PropTypes.func.isRequired,
  getAlbums: PropTypes.bool.isRequired,
  artistName: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
