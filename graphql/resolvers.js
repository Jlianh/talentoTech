const UserSchema = require('../models/User')

const resolvers = {
    hello: () => {
        return "hola mundo";
    },
    User: async ({id}) => {
        try {
            return user = await UserSchema.findById(id)
        } catch (error) {
            console.log(error)
        }
    },
    Users: async () => {
        try {
            return await UserSchema.find();
        } catch (error) {
            console.log(error)
        }
    },
    UsersByFilter: async ({filter}) =>{
        try {

            let query = {}

            if(filter){
                if(filter.name){
                    query.name = {$regex: filter.name, $options: 'i'}
                }
                if(filter.email){
                    query.email = {$regex: filter.email, $options: 'i'}
                }
                if(filter.lastname){
                    query.lastname = {$regex: filter.lastname, $options: 'i'}
                }

                const users = await UserSchema.find(query)
                return users;
            } 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = resolvers