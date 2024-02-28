const bcrypt = require('bcrypt');
const UserSchema = require('../models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const secret = process.env.JWT_SECRET || '';

class AuthController {

    constructor() { }

    async login(req, res) {

        var email = req.body.email;
        var password = req.body.password;

        try {
            const user = await UserSchema.findOne({ email });
            if (!user) {
                res.send({ "status": "error", "message": "The user doesnt exists" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.send({ "status": "error", "message": "Incorrect password" });
            }
            const token = jwt.sign({ userId: user._id, email: user.email, role: "admin" }, secret, { expiresIn: '1h' })
            res.send({ "status": "success", "token": token });
        } catch (error) {
            console.log(error)
            res.send({ "status": "error", "message": "Login error" });
        }
    }

    validateToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ "message": "The Token doesnt exists" });
        }
        const tokenWOBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
        jwt.verify(tokenWOBearer, 'secreto', (err, decoded) => {
            if (err) {
                return res.status(401).json({ "message": "Invalid Token" });
            }
            req.userId = decoded.userId;
            next();
        })
    }
}

module.exports = AuthController;