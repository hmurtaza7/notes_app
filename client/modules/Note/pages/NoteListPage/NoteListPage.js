import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import NoteList from '../../components/NoteList';
import NoteCreateWidget from '../../components/NoteCreateWidget/NoteCreateWidget';

// Import Actions
import { addNoteRequest, fetchNotes, deleteNoteRequest } from '../../NoteActions';
import { toggleaddNote } from '../../../App/AppActions';

// Import Selectors
import { getShowaddNote } from '../../../App/AppReducer';
import { getNotes } from '../../NoteReducer';

class NoteListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchNotes());
  }

  handledeleteNote = note => {
    if (confirm('Do you want to delete this note')) { // eslint-disable-line
      this.props.dispatch(deleteNoteRequest(note));
    }
  };

  handleaddNote = (title, content) => {
    this.props.dispatch(toggleaddNote());
    this.props.dispatch(addNoteRequest({ title, content }));
  };

  render() {
    return (
      <div>
        <NoteCreateWidget addNote={this.handleaddNote} showaddNote={this.props.showaddNote} />
        <NoteList handledeleteNote={this.handledeleteNote} notes={this.props.notes} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
NoteListPage.need = [() => { return fetchNotes(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showaddNote: getShowaddNote(state),
    notes: getNotes(state),
  };
}

NoteListPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showaddNote: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

NoteListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(NoteListPage);
