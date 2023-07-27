import { User } from "../../models/users.model";

export const userStub = (): Partial<User> => {
  return {
    id: 1,
    name: 'user1',
    email: 'user1@mail.uz',
    password: '123456',
    is_active: true,
  };
};
