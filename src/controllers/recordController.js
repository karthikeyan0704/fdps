const db = require('../models/db');

const generateFriendlyId = () => {
    return 'REC-' + Math.random().toString(36).substr(2, 7).toUpperCase();
};

const recordController = {
    // Fetches all financial records with optional human-friendly filters
    getAllRecords: (request, response) => {
        let allRecords = db.getRecords();
        const { date, category, type } = request.query;

        console.log(`Fetching filtered search for: ${type || 'all types'} - ${category || 'all categories'}`);

        if (date) allRecords = allRecords.filter(record => record.date.includes(date));
        if (category) allRecords = allRecords.filter(record => record.category === category);
        if (type) allRecords = allRecords.filter(record => record.type === type.toLowerCase());

        response.json({
            count: allRecords.length,
            records: allRecords
        });
    },

    // Retreive a single transaction by its unique ID
    getRecordById: (request, response) => {
        const record = db.getRecordById(request.params.id);
        if (!record) {
            return response.status(404).json({ error: "Sorry, we couldn't find that transaction." });
        }
        response.json(record);
    },

    // Save a new financial entry (income or expense)
    createNewRecord: (request, response) => {
        const { amount, type, category, date, notes } = request.body;
        
        // Simple and helpful feedback on missing data
        if (!amount || !type || !category || !date) {
            return response.status(400).json({ error: 'Please provide all necessary details: amount, type, category, and date.' });
        }

        const normalizedType = type.toLowerCase();
        if (!['income', 'expense'].includes(normalizedType)) {
            return response.status(400).json({ error: `The type '${type}' is invalid. Please use 'income' or 'expense'.` });
        }

        const newEntry = {
            id: generateFriendlyId(),
            amount: parseFloat(amount),
            type: normalizedType,
            category,
            date,
            notes: notes || 'No description provided.',
            createdBy: request.user.username, // Using name instead of ID is more "human"
            createdAt: new Date().toISOString()
        };

        db.addRecord(newEntry);
        console.log(`${normalizedType.toUpperCase()} of $${amount} added successfully.`);
        response.status(201).json(newEntry);
    },

    // Update existing record details
    updateRecordDetails: (request, response) => {
        const existingRecord = db.getRecordById(request.params.id);
        if (!existingRecord) {
            return response.status(404).json({ error: "This record doesn't exist, so it can't be updated." });
        }

        const updatedResult = db.updateRecord(request.params.id, request.body);
        response.json(updatedResult);
    },

    // Delete a record from history
    removeRecord: (request, response) => {
        const isDeleted = db.deleteRecord(request.params.id);
        if (!isDeleted) {
            return response.status(404).json({ error: "Couldn't delete what isn't there." });
        }
        console.log(`Record ${request.params.id} has been permanently removed.`);
        response.status(200).json({ message: 'The record was deleted successfully.' }); // 200 with msg is often more "human" than empty 204
    }
};

module.exports = recordController;
