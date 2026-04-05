const db = require('../models/db');

const generateSafeUserId = (name) => {
    return `${name.toLowerCase()}-${Math.floor(Math.random() * 899 + 100)}`;
};

const userController = {
    // List all registered team members
    listAllUsers: (request, response) => {
        // We strip passwords for security before sending data to the client
        const safeUserList = db.getUsers().map(user => {
            const { password, ...publicInfo } = user;
            return publicInfo;
        });
        response.json(safeUserList);
    },

    // Get the profile of a single user
    getUserProfile: (request, response) => {
        const user = db.getUserById(request.params.id);
        if (!user) {
            return response.status(404).json({ error: "Hmm, we couldn't find a user with that ID." });
        }
        const { password, ...publicInfo } = user;
        response.json(publicInfo);
    },

    // Add a new user to the organization
    registerNewUser: (request, response) => {
        const { username, password, role, status } = request.body;

        if (!username || !password || !role) {
            return response.status(400).json({ error: "Registration failed. We need a username, password, and a role." });
        }

        const allowedRoles = ['admin', 'analyst', 'viewer'];
        if (!allowedRoles.includes(role.toLowerCase())) {
            return response.status(400).json({ error: `Invalid role choice. Please pick from: ${allowedRoles.join(', ')}` });
        }

        const newlyCreatedUser = {
            id: generateSafeUserId(username),
            username,
            password, 
            role: role.toLowerCase(),
            status: status || 'active',
            createdAt: new Date().toISOString()
        };

        db.addUser(newlyCreatedUser);
        const { password: _, ...publicInfo } = newlyCreatedUser;
        console.log(`New user account created for: ${username} (${role})`);
        response.status(201).json(publicInfo);
    },

    // Update existing user details like status or role
    modifyUserAccount: (request, response) => {
        const userToUpdate = db.getUserById(request.params.id);
        if (!userToUpdate) {
            return response.status(404).json({ error: "That user doesn't seem to exist." });
        }

        const updatedAccount = db.updateUser(request.params.id, request.body);
        const { password: _, ...publicInfo } = updatedAccount;
        response.json(publicInfo);
    }
};

module.exports = userController;
