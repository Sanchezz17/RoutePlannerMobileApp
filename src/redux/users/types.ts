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

export interface UserRight {
    userId: number;
    right: Right;
}

export interface Coordinate {
    address: string;
    latitude: number;
    longitude: number;
}

export const defaultCoordinate: Coordinate = {
    latitude: 56.8430993,
    longitude: 60.64540859999999,
    address: '',
};

export enum Right {
    Manager,
    Admin,
    Superuser,
}

export const hasUserRight = (user: User | undefined, right: Right): boolean =>
    user
        ? user.rights.includes(Right.Superuser) || user.rights.includes(right)
        : false;
