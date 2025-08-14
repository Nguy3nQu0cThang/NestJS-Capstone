export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  createdAt?: Date;
}
