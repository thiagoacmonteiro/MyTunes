import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { searchButtonState, onInputChange, searchInput } = this.props;

    return (
      <div data-testid="page-search">
        <p>search</p>
        <Header { ...this.props } />
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
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchButtonState }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchButtonState: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default Search;
