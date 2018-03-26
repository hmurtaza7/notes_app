/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './modules/App/App';
import RequireAuth from './modules/Auth/components/RequireAuth';
import NoteListPage from './modules/Note/pages/NoteListPage/NoteListPage';
import NoteDetailPage from './modules/Note/pages/NoteDetailPage/NoteDetailPage';
import RegisterPage from './modules/Auth/pages/RegisterPage/RegisterPage';
import LoginPage from './modules/Auth/pages/LoginPage/LoginPage';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Note/pages/NoteListPage/NoteListPage');
  require('./modules/Note/pages/NoteDetailPage/NoteDetailPage');
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RequireAuth(NoteListPage)} />
    <Route
      path="/notes/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Note/pages/NoteDetailPage/NoteDetailPage').default);
        });
      }}
    />
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
// <IndexRoute
//   getComponent={RequireAuth((nextState, cb) => {
//     require.ensure([], require => {
//       cb(null, require('./modules/Note/pages/NoteListPage/NoteListPage').default);
//     });
//   })}
// />
// <Route
//   path="/notes/:slug-:cuid"
//   getComponent={(nextState, cb) => {
//     require.ensure([], require => {
//       cb(null, require('./modules/Note/pages/NoteDetailPage/NoteDetailPage').default);
//     });
//   }}
// />
// <Route
//   path="/register"
//   getComponent={(nextState, cb) => {
//     require.ensure([], require => {
//       cb(null, require('./modules/Auth/pages/RegisterPage/RegisterPage').default);
//     });
//   }}
// />
// <Route
//   path="/login"
//   getComponent={(nextState, cb) => {
//     require.ensure([], require => {
//       cb(null, require('./modules/Auth/pages/LoginPage/LoginPage').default);
//     });
//   }}
// />
// <Route path="/notes/:slug-:cuid" component={RequireAuth(NoteDetailPage)} />
