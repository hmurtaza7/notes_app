import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { loginUserRequest } from '../../AuthActions';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleLogin = () => {
    if (this.state.email && this.state.password) {
      this.props.dispatch(loginUserRequest({
        email: this.state.email,
        password: this.state.password,
      }));
      this.setState({ email: '', password: '' });
    }
  }

  handleEmail = (event: object, newValue: string) => {
    this.setState({ email: newValue });
  }

  handlePassword = (event: object, newValue: string) => {
    this.setState({ password: newValue });
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Email"
          fullWidth={true}
          onChange={this.handleEmail}
        />
        <TextField
          hintText="Password"
          fullWidth={true}
          type="password"
          onChange={this.handlePassword}
        />
        <FlatButton label="Login" href='#' onClick={this.handleLogin} />
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(LoginPage);
