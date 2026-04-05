/**
 * Role-Based Access Control Middleware
 * Returns a middleware that checks if req.user.role is allowed.
 * @param {Array<string>} roles - List of allowed roles
 */
const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Auth credentials missing' });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ error: `Forbidden. Role '${req.user.role}' cannot perform this action.` });
        }

        next();
    };
};

module.exports = authorize;
