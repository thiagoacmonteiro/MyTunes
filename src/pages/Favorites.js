import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  render() {
    const favorites = JSON.parse(localStorage.getItem('favorite_songs'));
    const favoritesIds = favorites.map((favorite) => favorite.trackId);

    return (
      <div
        data-testid="page-favorites">
        <Header />
        { favorites.length > 0 ? (
          <div className={`flex flex-col ${favorites.length > 6 ? 'h-full' : 'h-screen'} w-screen bg-gradient-to-t from-cyan-500 to-emerald-500 items-center`}>
            <p className="mt-10 mb-10 text-emerald-900 font-semibold text-xl">Your favorite songs</p>
            <div>
              {favorites.map((favorite) => (
                <MusicCard music={favorite} favoritesIds={ favoritesIds } />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-screen w-screen items-center bg-gradient-to-t from-cyan-500 to-emerald-500">
            <p className="mt-20 text-emerald-900 font-semibold text-xl">You don't have any favorite songs to show</p>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
