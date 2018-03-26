import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

// Import Style
import styles from './NoteCreateWidget.css';

export class NoteCreateWidget extends Component {

  initialState = {
    title: '',
    content: '',
  }

  addNote = () => {
    if (this.state.title && this.state.content) {
      this.props.addNote(this.state.title, this.state.content);
      this.setState({ title: '', content: '' });
    }
  };

  handleTitle = (event: object, newValue: string) => {
    this.setState({ title: newValue });
  }

  handleContent = (event: object, newValue: string) => {
    this.setState({ content: newValue });
  }

  render() {
    const cls = `${styles.form} ${(this.props.showaddNote ? styles.appear : '')}`;
    return (
      <Card className={cls}>
        <CardTitle title='Create New Note' />
        <CardText>
          <TextField
            hintText="Title"
            fullWidth={true}
            onChange={this.handleTitle}
          />
          <TextField
            hintText="Content"
            fullWidth={true}
            multiLine={true}
            rows={5}
            onChange={this.handleContent}
          />
        </CardText>
        <CardActions>
          <FlatButton label="Submit" href='#' onClick={this.addNote} />
        </CardActions>
      </Card>
    );
  }
}

NoteCreateWidget.propTypes = {
  addNote: PropTypes.func.isRequired,
  showaddNote: PropTypes.bool.isRequired,
};

export default NoteCreateWidget;
