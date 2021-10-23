import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
    };
  }

  // Call getUserData after mount
  componentDidMount() {
    this.getUserData();
  }

  // Get user info from local storage, set new state for user with the user name, and stop loading
  async getUserData() {
    const user = await getUser();

    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const {
      loading,
      user,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {`Welcome ${user.name}`}
        </p>
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
