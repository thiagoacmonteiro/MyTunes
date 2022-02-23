import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div
        className="h-screen w-screen flex justify-center items-center
          bg-gradient-to-t from-cyan-500 to-green-500 absolute z-30"
        data-testid="page-loading"
      >
        <p className="animate-spin h-5 w-5 mr-3">Loading</p>
      </div>
    );
  }
}

export default Loading;
