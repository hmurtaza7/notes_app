// Import Actions
import { TOGGLE_ADD_NOTE } from './AppActions';

// Initial State
const initialState = {
  showaddNote: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_NOTE:
      return {
        showaddNote: !state.showaddNote,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showaddNote
export const getShowaddNote = state => state.app.showaddNote;

// Export Reducer
export default AppReducer;
