const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

/**
 * Lightweight JSON Database Handler
 */
class LocalDB {
    constructor() {
        this.data = this._load();
    }

    _load() {
        try {
            if (!fs.existsSync(DB_PATH)) {
                const initialData = { users: [], records: [] };
                fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
                return initialData;
            }
            const rawData = fs.readFileSync(DB_PATH, 'utf-8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Error loading database:', error);
            return { users: [], records: [] };
        }
    }

    _save() {
        try {
            fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
            return true;
        } catch (error) {
            console.error('Error saving database:', error);
            return false;
        }
    }

    // User Operations
    getUsers() { return this.data.users; }
    
    getUserById(id) { 
        return this.data.users.find(u => u.id === id); 
    }

    addUser(user) {
        this.data.users.push(user);
        this._save();
        return user;
    }

    updateUser(id, updates) {
        const index = this.data.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.data.users[index] = { ...this.data.users[index], ...updates };
            this._save();
            return this.data.users[index];
        }
        return null;
    }

    // Record Operations
    getRecords() { return this.data.records; }

    getRecordById(id) {
        return this.data.records.find(r => r.id === id);
    }

    addRecord(record) {
        this.data.records.push(record);
        this._save();
        return record;
    }

    updateRecord(id, updates) {
        const index = this.data.records.findIndex(r => r.id === id);
        if (index !== -1) {
            this.data.records[index] = { ...this.data.records[index], ...updates };
            this._save();
            return this.data.records[index];
        }
        return null;
    }

    deleteRecord(id) {
        const initialLength = this.data.records.length;
        this.data.records = this.data.records.filter(r => r.id !== id);
        if (this.data.records.length !== initialLength) {
            this._save();
            return true;
        }
        return false;
    }
}

module.exports = new LocalDB();
