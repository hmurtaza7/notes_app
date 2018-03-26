import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Create a User
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.email || !req.body.user.password) {
    res.status(403).end();
    return;
  }

  const newUser = new User(req.body.user);

  // Let's sanitize inputs
  newUser.name = sanitizeHtml(newUser.name);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.password = sanitizeHtml(newUser.password);

  newUser.token = cuid();
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({
      user: {
        name: user.name,
        email: user.email,
        token: user.token,
      },
    });
  });
}

/**
 * Login a User
 * @param req
 * @param res
 * @returns void
 */
export function loginUser(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
    return;
  }

  User.findOne({
    email: req.body.user.email,
    password: req.body.user.password,
  }, (err, user) => {
    if(err) {
      res.status(500).end();
    }

    if (user) {
      res.json({
        user: {
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    }
    else {
      res.status(403).end();
    }
  });
}

/**
 * Check if Auth token is valid
 * @param req
 * @param res
 * @returns void
 */
export function checkAuth(req, res) {
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
      res.json({
        user: {
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    }
    else {
      res.status(403).end();
    }
  });
}
