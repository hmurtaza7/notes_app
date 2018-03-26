import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';
const router = new Router();

// Get all Notes
router.route('/notes').get(NoteController.getNotes);

// Get one note by cuid
router.route('/notes/:cuid').get(NoteController.getNote);

// Add a new note
router.route('/notes').post(NoteController.addNote);

// Delete a note by cuid
router.route('/notes/:cuid').delete(NoteController.deleteNote);

export default router;
