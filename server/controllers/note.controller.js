import Note from '../models/note';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all notes
 * @param req
 * @param res
 * @returns void
 */
export function getNotes(req, res) {
  Note.find().sort('-dateAdded').exec((err, notes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ notes });
  });
}

/**
 * Save a note
 * @param req
 * @param res
 * @returns void
 */
export function addNote(req, res) {
  if (!req.body.note.title || !req.body.note.content) {
    res.status(403).end();
  }

  const newNote = new Note(req.body.note);

  // Let's sanitize inputs
  newNote.title = sanitizeHtml(newNote.title);
  newNote.content = sanitizeHtml(newNote.content);

  newNote.slug = slug(newNote.title.toLowerCase(), { lowercase: true });
  newNote.cuid = cuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note: saved });
  });
}

/**
 * Get a single note
 * @param req
 * @param res
 * @returns void
 */
export function getNote(req, res) {
  Note.findOne({ cuid: req.params.cuid }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note });
  });
}

/**
 * Delete a note
 * @param req
 * @param res
 * @returns void
 */
export function deleteNote(req, res) {
  Note.findOne({ cuid: req.params.cuid }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    note.remove(() => {
      res.status(200).end();
    });
  });
}
