export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  rights: UserRight[];
}

export interface UserRight {
  userId: number;
  right: Right;
}

export enum Right {
  Manager,
  Admin,
}

export const defaultUser: User = {
  id: 0,
  name: '',
  email: '',
  picture: '',
  rights: [],
};
