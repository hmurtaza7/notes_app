import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// Import Style
// import styles from './NoteListItem.css';

function NoteListItem(props) {
  return(
    <Card>
      <CardTitle title={props.note.title} />
      <CardText>
        {props.note.content}
      </CardText>
      <CardActions>
        <FlatButton label="Delete" onClick={props.onDelete} />
        <FlatButton label="View" href={`/notes/${props.note.slug}-${props.note.cuid}`} />
      </CardActions>
    </Card>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteListItem;
