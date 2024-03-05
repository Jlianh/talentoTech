const bcrypt = require('bcrypt');

class Utils {
    generateCode() {
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
        
        return numbers+characters
    }
    
   async encryptPassword(password, massive){
        if(massive){ 
            return await bcrypt.hashSync(password, 10);
        } else {
            return await bcrypt.hash(password, 10);
        }
    }
}

module.exports = Utils