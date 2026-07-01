
import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

async function createUser(apiHelper: any) {

    let userData = {
        name: 'Tom',
        email: `automationAPI_${Date.now()}@api.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test - Create a user - POST-GET
//POST -> userID -> GET/userID-verify
test('@sanity POST - create a user', async ({ apiHelper }) => {

    let userResponse = await createUser(apiHelper);
    let userID = userResponse.id;

    let getResponse = await apiHelper.get(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Tom");
})

//Test2: Update a user
////POST -> userID -> PUT -> GET/userID-verify
test('@sanity PUT - Update a user', async ({ apiHelper }) => {

        let UpdatedUserData = {
        name: 'Tom Cruise',
        status: 'inactive'
    }

    //create the user
    let userResponse = await createUser(apiHelper);
    let userID = userResponse.id;

    //update the user
    let putResponse = await apiHelper.put(`/public/v2/users/${userID}`,UpdatedUserData, AUTH_HEADER);
    expect(putResponse.status).toBe(200);

    //get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(UpdatedUserData.name);
})

//Test 3 - Delete a User
////POST -> userID -> DELETE(204) -> GET/userID-verify(404)
test('DELETE - Delete a user', async ({ apiHelper }) => {

    //create the user
    let userResponse = await createUser(apiHelper);
    let userID = userResponse.id;

    //delete the user
    let deleteResponse = await apiHelper.delete(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);

    //Verify the deleted user
    let getResponse = await apiHelper.get(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
})