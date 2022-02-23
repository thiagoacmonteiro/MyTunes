import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Loading from './Loading';
import loginImage from '../images/loginimage.jpg';

class Login extends React.Component {
  render() {
    const {
      onInputChange,
      submitButtonState,
      loginNameInput,
      loginEmail,
      onSubmitButtonClick,
      loading,
      redirectToSearch,
    } = this.props;

    if (redirectToSearch) return <Redirect to="/search" />;

    return (
      <div
        className="h-screen bg-gradient-to-t from-cyan-500 to-emerald-500"
        data-testid="page-login"
      >
        {/* Condition to display acording to the state of loading. */}
        { loading ? (
          <Loading />
        ) : (
          <div className="flex h-screen flex-col items-center justify-center">
            <p className="mb-10 text-7xl text-cyan-900">MyTunes</p>
            <h1 className="text-6xl mb-10 text-cyan-900">login</h1>
            <img
              className="rounded-full h-72 w-72"
              src={ loginNameInput === '' ? (
                loginImage
              ) : (
                `https://github.com/${loginNameInput}.png`
              ) }
              alt={ loginNameInput }
            /> 
            <form className="flex flex-col items-center">
              <input
                className="rounded-md mt-5 mb-5"
                placeholder="Enter your github user name"
                type="text"
                data-testid="login-name-input"
                name="loginNameInput"
                value={ loginNameInput }
                onChange={ onInputChange }
              />
              <input
                className="rounded-md"
                placeholder="Enter your email"
                type="text"
                data-testid="login-email-input"
                name="loginEmail"
                value={ loginEmail }
                onChange={ onInputChange }
              />
              <button
                className="mt-5 rounded-md w-20 bg-emerald-600 text-white font-bold"
                type="submit"
                data-testid="login-submit-button"
                disabled={ submitButtonState }
                onClick={ onSubmitButtonClick }
              >
                Enter
              </button>
            </form>
          </div>) }
      </div>
    );
  }
}

Login.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  submitButtonState: PropTypes.func.isRequired,
  loginNameInput: PropTypes.string.isRequired,
  onSubmitButtonClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  redirectToSearch: PropTypes.bool.isRequired,
};

export default Login;
