
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/UserModel");
// const ensureAuthenticated = (req, res, next) => {
//     const auth = req.headers['authorization'];
//     if (!auth) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token is require' });
//     }
//     try {
//         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token wrong or expired' });
//     }
// }

// module.exports = ensureAuthenticated;



const ensureAuthenticated = async (req, res, next) => {
    try {
        let auth = req.headers['authorization'];

        if (!auth) {
            return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
        }

        // Extract token if it starts with "Bearer "
        if (auth.startsWith("Bearer ")) {
            auth = auth.slice(7, auth.length).trim(); // Remove "Bearer " prefix
        }

        console.log("Received Token:", auth);

        // Verify JWT
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // Check if the user exists
        const user = await UserModel.findById(decoded._id);
        if (!user) {
            return res.status(403).json({ message: 'Unauthorized, user not found' });
        }

        console.log("User Found in DB:", user);

        // Check if the stored token matches
        if (user.token !== auth) {
            return res.status(403).json({ message: 'Unauthorized, token is invalid or expired' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token Verification Error:", err);
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired', error: err.message });
    }
};

module.exports = ensureAuthenticated;



