const HouseSchema = require('../models/Houses');

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

beforeEach(async () =>{
    await mongoose.connect(process.env.DB_URL);
})

afterEach(async () =>{
    await mongoose.connection.close();
})

describe('House Tests', ()=>{
    test('get all houses', async ()=>{
        const res = await request(app).get("/house/allHouses");
        expect(res.body.length).toBeGreaterThan(0)
    })
    test('response with an specific house', async ()=>{
        const res = await request(app).get("/house/getHouseById/65d416d03472d8ab00738564");
        expect(typeof res.body === 'object').toBe(true)
    })
    test('post a house', async ()=>{

        const house = {
            address: "Calle 22 # 2F - 1 Sur",
            city: "Bogotá",
            state: "Bogotá",
            size: 999,
            type: "House",
            zipCode: 111023,
            rooms: 99,
            bathrooms: 99,
            parking: true,
            price: 999999999,
        }

        const res = await request(app).post("/house/addHouse/").send(house);
        expect(res.body).toHaveProperty('_id')
    })

    test('edit a house', async ()=>{

        const originalHouse = await HouseSchema.findOne({address : "Calle 22 # 2F - 1 Sur"})

        const house = {
            address: originalHouse.address,
            city: originalHouse.city,
            state: originalHouse.state,
            size: 100,
            type: originalHouse.type,
            zipCode: originalHouse.zipCode,
            rooms: 10,
            bathrooms: 10,
            parking: originalHouse.parking,
            price: 1000000000,
            code: originalHouse.code,
        }

        const res = await request(app).patch("/house/editHouse/"+originalHouse._id).send(house);
        expect(res.body).toHaveProperty('_id')
    })

    test('delete a house', async ()=>{
        const originalHouse = await HouseSchema.findOne({address : "Calle 22 # 2F - 1 Sur"})
        const res = await request(app).delete("/house/deleteHouse/"+originalHouse._id);
        expect(res.status).toBe(200)
    })
})