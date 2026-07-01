

import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userID;

//GET TEST

test('GET API - get all users', async ({ apiHelper }) => {

    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

})

test.describe.serial('@smoke running E2E crud', ()=>{
    test('POST API - Create a User', async ({ apiHelper }) => {
    let userData = {
        name: 'Tom',
        email: `automationAPI_${Date.now()}@api.com`,
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.body.name).toBe(userData.name);
    expect(response.status).toBe(201);
    userID = response.body.id;
    console.log('Created User ID: ', userID);
})

test('@smoke PUT API - Update a User', async ({ apiHelper }) => {
    let userData = {
        status: 'inactive'
    }

    let response = await apiHelper.put(`/public/v2/users/${userID!}`, userData, AUTH_HEADER);
    expect(response.body.status).toBe(userData.status);
    expect(response.status).toBe(200);
    console.log('updated status: ', response.status);
})

test('@smoke Delete API - Delete a User', async ({ apiHelper }) => {
    let userData = {
        status: 'inactive'
    }

    let response = await apiHelper.delete(`/public/v2/users/${userID!}`, AUTH_HEADER);
    expect(response.status).toBe(204);
})



})