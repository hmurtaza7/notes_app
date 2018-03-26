import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get current user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

/**
 * Create a User
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  }

  const newUser = new User(req.body.user);

  // Let's sanitize inputs
  newUser.name = sanitizeHtml(newUser.name);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.password = sanitizeHtml(newUser.password);

  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user: saved });
  });
}
