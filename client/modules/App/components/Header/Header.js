import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// Import Style
import styles from './Header.css';

export class Header extends Component {

  goToRoot = () => {
  }

  render() {
    return (
      <AppBar
        title="Notes"
        onTitleClick={this.goToRoot}
        iconElementRight={<FlatButton onClick={this.props.toggleaddNote} label="Add Note" />}
      />
    );
  }
}

Header.propTypes = {
  toggleaddNote: PropTypes.func.isRequired,
};

export default Header;
