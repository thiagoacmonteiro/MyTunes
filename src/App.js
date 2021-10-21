import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    // Bind functions to be seen trough 'this'
    this.submitButtonBehavior = this.submitButtonBehavior.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.searchButtonBehavior = this.searchButtonBehavior.bind(this);

    // Set initial state
    this.state = {
      loginNameInput: '',
      submitButtonState: true,
      loading: false,
      redirectToSearch: false,
      searchButtonState: true,
      searchInput: '',
    };
  }

  // onInputChange({target}) {
  //   console.log(target);
  //   const { value } = target;

  //   this.setState({
  //     searchInput: value,
  //     searchButtonState: this.searchButtonBehavior(value)
  //   })
  // }

  // Generic input handler
  onInputChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
      searchButtonState: this.searchButtonBehavior(value),
      submitButtonState: this.submitButtonBehavior(value),
    });
  }

  // Show loading message while redirect to search page after clicking enter button
  onSubmitButtonClick() {
    const { loginNameInput } = this.state;

    this.setState({ loading: true },
      () => createUser({ name: loginNameInput })
        .then(() => this.setState({
          loading: false,
          redirectToSearch: true,
        })));
  }

  // Verify whether the name input length is equal or longer than 3
  submitButtonBehavior(loginNameInput) {
    const minLength = 3;

    if (loginNameInput.length >= minLength) {
      return false;
    }
    return true;
  }

  // Verify whether the search input length is equal or longer than 2
  searchButtonBehavior(searchInput) {
    const minLength = 2;

    if (searchInput.length >= minLength) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              { ...this.state }
              onInputChange={ this.onInputChange }
              onSubmitButtonClick={ this.onSubmitButtonClick }
            />) }
          />
          <Route
            path="/search"
            render={ () => (<Search
              { ...this.state }
              onInputChange={ this.onInputChange }
            />) }
          />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
