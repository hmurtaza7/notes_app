import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { registerUserRequest } from '../../AuthActions';

class RegisterPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSignup = () => {
    if (this.state.name && this.state.email && this.state.password) {
      this.props.dispatch(registerUserRequest({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }));
      this.setState({ name: '', email: '', password: '' });
    }
  }

  handleName = (event: object, newValue: string) => {
    this.setState({ name: newValue });
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
          hintText="Name"
          fullWidth={true}
          onChange={this.handleName}
        />
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
        <FlatButton label="Signup" href='#' onClick={this.handleSignup} />
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

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(RegisterPage);
