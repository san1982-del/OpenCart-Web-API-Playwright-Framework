import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private readonly baseURL: string;
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }


    //GET
    async get(endPoint: string, headers?: Record<string, string>, params?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers,
            params:params
        });
        // console.log(response)
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //POST
    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });

        

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //Delete
    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        return {
            status: response.status()
        }
    }
}