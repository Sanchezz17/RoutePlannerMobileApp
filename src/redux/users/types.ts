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
    address: string;
    latitude: number;
    longitude: number;
}

export enum Right {
    Manager,
    Admin,
}
