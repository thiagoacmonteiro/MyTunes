import React from 'react';
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

  componentDidMount() {
    this.getUserData();
  }

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
          Welcome
          { user.name }
        </p>
      </header>
    );
  }
}

export default Header;
