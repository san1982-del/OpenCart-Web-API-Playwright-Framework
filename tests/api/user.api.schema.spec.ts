
import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from "ajv";

let TOKEN = process.env.GOREST_API_TOKEN;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//setup the AJV
let ajv = new Ajv();

//define the JSON schema
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

let usersArraySchema = {
    "type": "array",
    "items" : userSchema
}

test('validate user schema', async ({ apiHelper }) => {

    let userData = {

        name: 'tom',
        email: `autom${Date.now()}@new.com`,
        gender: 'male',
        status: 'active'
    }

    let postResponse = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(postResponse.status).toBe(201);

    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.body.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //schema validation
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getResponse.body);
     

    if(!isSchemaValid){
        console.log("Schema Errors: ", validate.errors)
    }
    expect(isSchemaValid).toBeTruthy();
    console.log(isSchemaValid);
})

test('validate All Users schema', async ({ apiHelper }) => {

    let getResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //schema validation
    let validate = ajv.compile(usersArraySchema);
    let isSchemaValid = validate(getResponse.body);
   

    if(!isSchemaValid){
        console.log("Schema Errors: ", validate.errors)
    }
     expect(isSchemaValid).toBeTruthy();
    console.log(isSchemaValid);
})