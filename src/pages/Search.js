import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <p>search</p>
        <Header { ...this.props } />
      </div>
    );
  }
}

export default Search;
