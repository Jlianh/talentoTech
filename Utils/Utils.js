
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

        return numbersList + charactersList
    }
}

module.exports = Utils