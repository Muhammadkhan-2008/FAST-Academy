const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth();

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const { User } = require('../models/Schema');
      const user = await User.findOne({ clerkId: req.auth.userId });
      const userRole = user ? user.role : 'student';
      
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ error: 'Failed to verify institutional roles.' });
    }
  };
};

module.exports = { requireAuth, checkRole };
