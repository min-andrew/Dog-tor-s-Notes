const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveNote,
  deleteNote,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveNote);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/books/:bookId').delete(authMiddleware, deleteNote);

module.exports = router;
