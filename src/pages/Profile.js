import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
      <div
        className="flex flex-col w-screen h-screen items-center bg-gradient-to-t from-cyan-500 to-emerald-500"
        data-testid="page-profile">
        <Header />
        <img className="rounded-full mb-10 mt-24" src={ user.image } alt={ user.name } />
        <p className="text-emerald-900 font-semibold text-xl mb-10">Username: { user.name }</p>
        <p className="text-emerald-900 font-semibold text-xl">Email: { user.email }</p>
      </div>
    );
  }
}

export default Profile;
