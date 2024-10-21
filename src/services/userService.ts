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
