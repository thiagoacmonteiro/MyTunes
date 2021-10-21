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
      <div data-testid="page-login">
        {/* Condition to display acording to the state of loading */}
        { loading ? (
          <Loading />
        ) : (
          <div>
            <h1>login</h1>
            <form>
              <input
                type="text"
                data-testid="login-name-input"
                name="loginNameInput"
                value={ loginNameInput }
                onChange={ onInputChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ submitButtonState }
                onClick={ onSubmitButtonClick }
              >
                Entrar
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
