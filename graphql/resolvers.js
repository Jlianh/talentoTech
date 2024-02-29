const UserSchema = require('../models/User')
const HouseSchema = require('../models/Houses')

const resolvers = {
    hello: () => {
        return "hola mundo";
    },
    User: async (_, { id }) => {
        console.log({ id }, id);
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
    UsersByFilter: async (_, { filter }) => {
        try {

            let query = {}

            if (filter) {
                if (filter.name) {
                    query.name = { $regex: filter.name, $options: 'i' }
                }
                if (filter.email) {
                    query.email = { $regex: filter.email, $options: 'i' }
                }
                if (filter.lastname) {
                    query.lastname = { $regex: filter.lastname, $options: 'i' }
                }

                const users = await UserSchema.find(query)
                return users;
            }
        } catch (error) {
            console.log(error);
        }
    },
    House: async (_, { id }) => {
        try {
            return user = await HouseSchema.findById(id)
        } catch (error) {
            console.log(error)
        }
    },
    Houses: async () => {
        try {
            return await HouseSchema.find();
        } catch (error) {
            console.log(error)
        }
    },
    HouseByFilter: async (_, { filter }) => {
        try {

            let query = {}

            if (filter) {
                if (filter.address) {
                    query.address = { $regex: filter.address, $options: 'i' }
                }
                if (filter.city) {
                    query.city = { $regex: filter.city, $options: 'i' }
                }
                if (filter.state) {
                    query.state = { $regex: filter.state, $options: 'i' }
                }
                if (filter.size) {
                    query.size = { $regex: filter.size, $options: 'i' }
                }
                if (filter.type) {
                    query.type = { $regex: filter.type, $options: 'i' }
                }
                if (filter.zipCode) {
                    query.zipCode = { $regex: filter.zipCode, $options: 'i' }
                }
                if (filter.code) {
                    query.code = { $regex: filter.code, $options: 'i' }
                }
                if (filter.rooms) {
                    query.rooms = { $regex: filter.rooms, $options: 'i' }
                }
                if (filter.bathrooms) {
                    query.bathrooms = { $regex: filter.bathrooms, $options: 'i' }
                }
                if (filter.price) {
                    query.price = { $regex: filter.price, $options: 'i' }
                }
                if (filter.image) {
                    query.image = { $regex: filter.image, $options: 'i' }
                }

                const houses = await HouseSchema.find(query)
                return houses;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = resolvers