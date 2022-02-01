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
      <header
        className="flex w-full flex-col bg-emerald-300 drop-shadow-md"
        data-testid="header-component"
      >
        <p className="ml-2 mt-1 text-3xl text-cyan-900">MyTunes</p>
        <p className="self-center text text-cyan-900" data-testid="header-user-name">
          {`Welcome ${user.name}`}
        </p>
        <div className="flex justify-around mt-5 mb-2">
          <Link
            className="font-bold text-cyan-900"
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            className="font-bold text-cyan-900"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            className="font-bold text-cyan-900"
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
