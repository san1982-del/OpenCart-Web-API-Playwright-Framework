
import { test, expect } from '../../src/fixtures/apifixtures';

//let baseURL = 'https://restful-booker.herokuapp.com';
let api_Token: string;
let AUTH_HEADER: Record<string, string>;

async function generateToken(apiHelper: any) {
    let credentials = {
        "username": "admin",
        "password": "password123"
    }
    let postResponse = await apiHelper.post('/auth', credentials,
        {
            header: 'Content-Type: application/json'
        });
    return api_Token = postResponse.body.token;
}

async function createBooking(apiHelper: any) {
    let bookingData = {
        "firstname": `Jimmy_${Date.now()}`,
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    };

    let bookingResponse = await apiHelper.post('/booking', bookingData, {
        header: 'Content-Type: application/json'
    });
    console.log(bookingResponse.body)
    expect(bookingResponse.status).toBe(200);
    return bookingResponse.body;

}

test('Post - Validate Create Booking', async ({ apiHelper }) => {

    let bookingResponseBody = await createBooking(apiHelper);
    AUTH_HEADER = await generateToken(apiHelper);

    let getResponse = await apiHelper.get(`/booking/${bookingResponseBody.bookingid}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    console.log(getResponse.body);
})

test('Put - Validate Update Booking', async ({ apiHelper }) => {

    let bookingResponseBody = await createBooking(apiHelper);
    api_Token = await generateToken(apiHelper);

        let updateBookingData = {
        "firstname": bookingResponseBody.booking.firstname,
        "lastname": "Brown",
        "totalprice": 222,
        "depositpaid": false,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Lunch"
    };


    let header = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${api_Token}`
    }

    let putResponse = await apiHelper.put(`/booking/${bookingResponseBody.bookingid}`,updateBookingData, header);
    expect(putResponse.status).toBe(200);
    console.log(putResponse.body);

    let getResponse = await apiHelper.get(`/booking/${bookingResponseBody.bookingid}`);
    expect(getResponse.status).toBe(200);
    console.log(getResponse.body);
})

test('Patch - Validate Partial Update Booking', async ({ apiHelper }) => {

    let bookingResponseBody = await createBooking(apiHelper);
    api_Token = await generateToken(apiHelper);

        let partialUpdateBookingData = {
        "totalprice": 333,
    };


    let header = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${api_Token}`
    }

    let putResponse = await apiHelper.patch(`/booking/${bookingResponseBody.bookingid}`,partialUpdateBookingData, header);
    expect(putResponse.status).toBe(200);
    console.log(putResponse.body);

    let getResponse = await apiHelper.get(`/booking/${bookingResponseBody.bookingid}`);
    expect(getResponse.status).toBe(200);
    console.log(getResponse.body);
})


test('Delete - Validate Delete Booking', async ({ apiHelper }) => {

    let bookingResponseBody = await createBooking(apiHelper);
    api_Token = await generateToken(apiHelper);

    let header = {
            "Cookie": `token=${api_Token}`
    }

    let deleteResponse = await apiHelper.delete(`/booking/${bookingResponseBody.bookingid}`, header);
    expect(deleteResponse.status).toBe(201);

        let getheader = {
            "Accept": "application/json",
    }

    let getResponse = await apiHelper.get(`/booking/${bookingResponseBody.bookingid}`, getheader);
    expect(getResponse.status).toBe(404);
    //console.log(await getResponse.body);
})






