export interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    age: number;
    phone: string;
  };
}
