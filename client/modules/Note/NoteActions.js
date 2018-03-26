import cookie from 'react-cookies'

import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTES = 'ADD_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';

// Export Actions
export function addNote(note) {
  return {
    type: ADD_NOTE,
    note,
  };
}

export function addNoteRequest(note) {
  return (dispatch) => {
    return callApi('notes', 'post', {
      note: {
        title: note.title,
        content: note.content,
      },
    }, {
      'Authorization': cookie.load('token'),
    }).then(res => dispatch(addNote(res.note)));
  };
}

export function addNotes(notes) {
  return {
    type: ADD_NOTES,
    notes,
  };
}

export function fetchNotes() {
  return (dispatch) => {
    return callApi('notes', 'get', {}, {
      'Authorization': cookie.load('token'),
    }).then(res => {
      dispatch(addNotes(res.notes));
    });
  };
}

export function fetchNote(cuid) {
  return (dispatch) => {
    return callApi(`notes/${cuid}`, 'get', {}, {
      'Authorization': cookie.load('token'),
    }).then(res => dispatch(addNote(res.note)));
  };
}

export function deleteNote(cuid) {
  return {
    type: DELETE_NOTE,
    cuid,
  };
}

export function deleteNoteRequest(cuid) {
  return (dispatch) => {
    return callApi(`notes/${cuid}`, 'delete', {}, {
      'Authorization': cookie.load('token'),
    }).then(() => dispatch(deleteNote(cuid)));
  };
}
