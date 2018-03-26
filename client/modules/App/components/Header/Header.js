import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { logoutUserRequest } from '../../../Auth/AuthActions';

// Import Style
// import styles from './Header.css';

export class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    };
  }

  goToRoot = () => {
    window.location.href = '/';
  }

  handleMenuToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleLogin = () => {
    window.location.href = '/login';
  }

  handleSignup = () => {
    window.location.href = '/register';
  }

  handleLogout = () => {
    this.props.logoutUserRequest();
  }

  render() {
    const { authenticated } = this.props;

    const rightAction = authenticated ?
      <FlatButton onClick={this.props.toggleaddNote} label="Add Note" />  : null;

    return (
      <div>
        <AppBar
          title="Notes"
          onTitleClick={this.goToRoot}
          onLeftIconButtonClick={this.handleMenuToggle}
          iconElementRight={rightAction}
        />
        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
        >
          {authenticated ?
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            :
            <div>
              <MenuItem onClick={this.handleLogin}>Login</MenuItem>
              <MenuItem onClick={this.handleSignup}>Signup</MenuItem>
            </div>
          }
        </Drawer>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

Header.propTypes = {
  toggleaddNote: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { logoutUserRequest })(Header);
