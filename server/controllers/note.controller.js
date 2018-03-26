import Note from '../models/note';
import User from '../models/user';
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
  if (!req.headers.authorization) {
    res.status(403).end();
    return;
  }

  User.findOne({
    token: req.headers.authorization,
  }, (err, user) => {
    if(err) {
      res.status(403).end();
    }

    if (user) {
      Note.find({ user: user._id }).sort('-dateAdded').exec((err, notes) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ notes });
      });
    }
    else {
      res.status(403).end();
    }
  });
}

/**
 * Save a note
 * @param req
 * @param res
 * @returns void
 */
export function addNote(req, res) {
  if (!req.headers.authorization) {
    res.status(403).end();
    return;
  }

  if (!req.body.note.title || !req.body.note.content) {
    res.status(403).end();
    return;
  }

  User.findOne({
    token: req.headers.authorization,
  }, (err, user) => {
    if(err) {
      res.status(403).end();
    }

    if (user) {
      const newNote = new Note(req.body.note);

      // Let's sanitize inputs
      newNote.title = sanitizeHtml(newNote.title);
      newNote.content = sanitizeHtml(newNote.content);

      newNote.slug = slug(newNote.title.toLowerCase(), { lowercase: true });
      newNote.cuid = cuid();
      newNote.user = user._id;
      newNote.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ note: saved });
      });
    }
    else {
      res.status(403).end();
    }
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
      res.json({ cuid: cuid });
    });
  });
}
