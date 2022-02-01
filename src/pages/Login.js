import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const {
      onInputChange,
      submitButtonState,
      loginNameInput,
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
            <h1 className="text-6xl mb-10 text-cyan-900">login</h1>
            <form className="flex flex-col items-center">
              <input
                className="rounded-md"
                placeholder="Enter your email"
                type="text"
                data-testid="login-name-input"
                name="loginNameInput"
                value={ loginNameInput }
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
