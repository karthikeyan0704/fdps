const db = require('../models/db');

/**
 * Mock Auth Middleware
 * This checks who is making the request by looking at the 'x-user-id' header.
 */
const friendlyAuth = (request, response, next) => {
    const userId = request.headers['x-user-id'];
    
    if (!userId) {
        return response.status(401).json({ 
            error: "We couldn't identify you.",
            tip: "Please provide your ID in the 'x-user-id' header."
        });
    }

    const user = db.getUserById(userId);
    if (!user) {
        return response.status(403).json({ error: "Access denied. We don't recognize that user ID." });
    }

    if (user.status !== 'active') {
        return response.status(403).json({ error: "Your account is currently inactive. Please talk to an admin." });
    }

    // Pass the user details to the next part of our app
    request.user = user;
    next();
};

module.exports = friendlyAuth;
