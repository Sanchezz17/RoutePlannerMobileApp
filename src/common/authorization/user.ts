export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  mobilePhone: string;
  telegram: string;
  position: string;
  coordinate: Coordinate;
  rights: Right[];
}

export interface Coordinate {
  latitude: number;
  longitude: number;
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
  position: '',
  coordinate: {latitude: 0, longitude: 0},
  rights: [],
};
