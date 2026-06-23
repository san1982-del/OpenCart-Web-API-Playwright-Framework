
import { test, request, expect } from '@playwright/test';

let OAUTH_CONFIG = {
    tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    CLIENT_ID: process.env.OAUTH_CLIENT_ID!,
    CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET!,
    GRANT_TYPE: process.env.GRANT_TYPE!
}

let base_URL = 'https://test.api.amadeus.com';
let endPoint = '/v1/reference-data/locations';
let access_Token: string;

test.beforeEach('generate access token', async ({ request }) => {

    let response = await request.post(OAUTH_CONFIG.tokenURL, {

        form: {
            client_id: OAUTH_CONFIG.CLIENT_ID,
            client_secret: OAUTH_CONFIG.CLIENT_SECRET,
            grant_type: OAUTH_CONFIG.GRANT_TYPE
        }

    })

    let jsonResponse = await response.json();
    access_Token = jsonResponse.access_token;
    console.log(jsonResponse);
})

test('get Location', async ({ request }) => {

    let getResponse = await request.get(`${base_URL}${endPoint}`, {

        headers: {
            Authorization: `Bearer ${access_Token}`
        },
        params: {
            subType: 'CITY,AIRPORT',
            keyword: 'MUC',
            countryCode: 'DE'
        }
    });
    console.log(await getResponse.json());
})