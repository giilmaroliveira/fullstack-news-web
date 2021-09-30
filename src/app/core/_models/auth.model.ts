import { User } from "./user.model";

export interface Auth {
  auth: boolean;
  token: string;
  user: User;
}
