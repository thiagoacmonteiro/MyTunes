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
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);

    // Set initial state
    this.state = {
      loginNameInput: '',
      submitButtonState: true,
      loading: false,
      redirectToSearch: false,
    };
  }

  // Set new state to loginNameInput and submitButtonState
  onNameInputChange({ target }) {
    const { value } = target;

    this.setState({
      loginNameInput: value,
      submitButtonState: this.submitButtonBehavior(value),
    });
  }

  onSubmitButtonClick() {
    const { loginNameInput } = this.state;

    this.setState({ loading: true },
      () => createUser({ name: loginNameInput })
        .then(() => this.setState({
          loading: false,
          redirectToSearch: true,
        })));
  }

  // Verify whether the input has a length longer than 3
  submitButtonBehavior(loginNameInput) {
    const minLength = 3;

    if (loginNameInput.length >= minLength) {
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
              onNameInputChange={ this.onNameInputChange }
              onSubmitButtonClick={ this.onSubmitButtonClick }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
