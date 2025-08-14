import { User } from "./user.interface";

export interface UserSafe extends Omit<User, 'password'> {}
