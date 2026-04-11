import axiosInstance from "@/axios";
import { removeFromStorage, saveTokenStorage } from "@/axios/services";
import { ILogin } from "@/components/types/auth/login.types";

class AuthService {
  async main(data: ILogin) {
    const res = await axiosInstance.post("/auth/login", data);

    if (res.data.accessToken) {
      saveTokenStorage(res.data.accessToken, res.data.user.role);
    }

    return res;
  }

  async getNewTokens() {
    const res = await axiosInstance.post("/login/access-token");

    if (res.data.accessToken) {
      saveTokenStorage(res.data.accessToken, res.data.user.role);
    }

    return res;
  }

  async logout() {
    const res = await axiosInstance.post("/logout");

    if (res.data) {
      removeFromStorage();
    }

    return res;
  }
}

export const authService = new AuthService();
