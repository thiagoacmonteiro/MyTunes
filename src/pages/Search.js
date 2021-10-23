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
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="searchInput"
            value={ searchInput }
            onChange={ onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButtonState }
            onClick={ searchAlbum }
          >
            Pesquisar
          </button>
          {/* Condition to display according to the state of the array of albums */}
          { getAlbums ? (
            <div>
              <p>
                {`Resultado de álbuns de: ${artistName}`}
              </p>
              <div>
                {/* Map results using collection id and name */}
                { albums.map((album) => (
                  <Link
                    key={ album.collectionId }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    { album.collectionName }
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
