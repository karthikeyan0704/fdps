const express = require('express');
const router = express.Router();
const summaryService = require('../services/summaryService');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/rbac');

// Apply auth to all summary routes
router.use(auth);

// Both Analyst and Admin can view insights
router.get('/', authorize(['analyst', 'admin', 'viewer']), (request, response) => {
    try {
        const stats = summaryService.calculateFinancialOverview();
        response.json(stats);
    } catch (error) {
        response.status(500).json({ error: 'Sorry, we hit a snag generating your dashboard summary.' });
    }
});

module.exports = router;
