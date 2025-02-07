import { APIRequestContext } from "@playwright/test";

export class AuthService {
    
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async login(email: string, password: string) {
        const response = await this.request.post(`${process.env.API_URL}/users/login`, {
            data: {
                "user": {
                    "email": email,
                    "password": password
                }
            }
        })
        return response
    }
}