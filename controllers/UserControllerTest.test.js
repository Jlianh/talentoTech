const UserController = require('./UserController');

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

describe('users controller', ()=>{
    test('get all users', async ()=>{
        const res = await request(app).get("/user/allUsers");
        expect(res.body.length).toBeGreaterThan(0)
    })
    test('response with an specific user', async ()=>{
        const res = await request(app).get("/user/findById/65cea6008677076f1ef90bd6");
        console.log(res.body);
        expect(typeof res.body === 'object').toBe(true)
    })
    test('post an user', async ()=>{

        const user = {
            "identification": 13213123,
            "name": "Camilo",
            "lastname": "Fernandez",
            "email": "camilosd@email.com",
            "password": "camilo123"
        }

        const res = await request(app).post("/user/addUser/").send(user);
        console.log(res)
        expect(res.body).toHaveProperty('_id')
    })
})