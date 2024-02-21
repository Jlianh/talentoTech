const bcrypt = require('bcrypt');
const UserSchema = require('../models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const secret = process.env.JWT_SECRET || '';

class UserController {

    constructor(){}

    async login(email, password){
        try {
            const user = await UserSchema.findOne({email});
            if(!user){
                return {"status":"error", "message":"The user doesnt exists"};
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return {"status":"error", "message":"Incorrect password"};
            }
            const token = jwt.sign({userId: user._id, email: user.email, role: "admin"}, secret, {expiresIn: '1h'})
            return {"status":"success", "token":token};
        } catch (error) {
            console.log(error)
            return {"status":"error", "message":"Login error"};
        }
    }

    validateToken(req, res, next){
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({"message": "The Token doesnt exists"});
        }
        const tokenWOBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
        jwt.verify(tokenWOBearer, 'secreto', (err, decoded)=>{
            if(err){
                return res.status(401).json({"message": "Invalid Token"});
            }
            req.userId = decoded.userId;
            next();
        })
    }

    generateCode(){
        var characters = '';
        var numbers = '';
        var numbersList = '1234567890'
        var charactersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
        for (var i = 0; i < 4; i++) {
            var randomIndex = Math.floor(Math.random() * numbersList.length);
            characters += numbersList.charAt(randomIndex);
        }
    
        for (var i = 0; i < 4; i++) {
            var randomIndex = Math.floor(Math.random() * charactersList.length);
            numbers += charactersList.charAt(randomIndex);
        }

        return numbersList + charactersList
    }
}

module.exports = UserController;