const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/rbac');

// Apply auth to all user routes
router.use(auth);

// Admin only: CRUD users
router.get('/', authorize('admin'), userController.listAllUsers);
router.get('/:id', authorize('admin'), userController.getUserProfile);
router.post('/', authorize('admin'), userController.registerNewUser);
router.put('/:id', authorize('admin'), userController.modifyUserAccount);

module.exports = router;
