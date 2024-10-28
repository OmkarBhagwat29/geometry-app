import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../core/tokenPayload";
import { roles } from "./roles";

export class User {
  username: string = "";
  role: roles = "customer";
  tokenExpired: boolean = true;
  isAuthenticated: boolean = false;

  constructor(token: string) {
    const decoded: TokenPayload = jwtDecode(token);
    this.tokenExpired = decoded.exp * 1000 < Date.now();
    if (!this.tokenExpired) {
      this.username = decoded.username;
      this.role = decoded.role === "admin" ? "admin" : "customer";
      this.isAuthenticated = true;
    }
  }
}
