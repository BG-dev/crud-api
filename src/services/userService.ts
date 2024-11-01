import { v4 as uuid } from 'uuid';
import { User } from '../models/User';

let usersStorage: Array<User> = [];

export function getUsers(): Array<User> {
    return usersStorage;
}

export function getUser(id: string): User | undefined {
    return usersStorage.find((user) => user.id === id);
}

export function createUser(userData: Omit<User, 'id'>) {
    const newUser: User = { id: uuid(), ...userData };
    usersStorage.push(newUser);
    return newUser;
}

export function updateUser(id: string, userData: Omit<User, 'id'>): User | null {
    const index = usersStorage.findIndex((user) => user.id === id);
    if (index !== -1) {
        usersStorage[index] = { id, ...userData };
        return usersStorage[index];
    }
    return null;
}

export function deleteUser(id: string): boolean {
    const index = usersStorage.findIndex((user) => user.id === id);
    if (index !== -1) {
        usersStorage.splice(index, 1);
        return true;
    }
    return false;
}
