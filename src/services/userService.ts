import { User } from '../models/User';

let usersStorage: Array<User> = [];

export function getUsers(): Array<User> {
    return usersStorage;
}

export function getUser(id: string): User | undefined {
    return usersStorage.find((user) => user.id === id);
}
