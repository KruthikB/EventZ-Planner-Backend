const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        // Assuming the token is sent in the Authorization header in the format: 'Bearer [token]'
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token using the same secret key used to create the token
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret key

        // Add the user's ID to the request object
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authenticate;
