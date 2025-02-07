import { test as setup } from "@playwright/test";
import { AuthService } from "../services/authService";

setup("authentication", async ({ request }) => {
  const authService = new AuthService(request)
  const response = await authService.login(process.env.EMAIL, process.env.PASSWORD)
  const responseBody = await response.json()
  const accessToken = responseBody.user.token
  process.env.ACCESS_TOKEN = accessToken
})