const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/rbac');

// Apply auth to all record routes
router.use(auth);

// All roles (Viewer, Analyst, Admin) can view lists and single records
router.get('/', authorize(['viewer', 'analyst', 'admin']), recordController.getAllRecords);
router.get('/:id', authorize(['viewer', 'analyst', 'admin']), recordController.getRecordById);

// Analysts and Admins can view summaries - Wait, summaries have separate group. 
router.post('/', authorize('admin'), recordController.createNewRecord);
router.put('/:id', authorize('admin'), recordController.updateRecordDetails);
router.delete('/:id', authorize('admin'), recordController.removeRecord);

module.exports = router;
