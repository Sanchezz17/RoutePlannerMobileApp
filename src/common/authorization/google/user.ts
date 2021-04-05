export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  mobilePhone: string;
  telegram: string;
  rights: Right[];
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
  mobilePhone: '',
  telegram: '',
  rights: [],
};
