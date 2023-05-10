export interface User {
  userId: number;
  id: number;
  username: string;
  email: string;
  name: { firstname: string; lastname: string };
  completed: boolean;
}
