export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  surName: string;
  dateOfBirth: Date;
  gender: string;
  isAdmin: boolean;
  firm: string | null;
  city: string;
  chats: {id: number, type: string}[];
}
