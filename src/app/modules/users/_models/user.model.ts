import { Profile } from "./profile.model";

export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  profile: Profile;
}
