"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const uuid_1 = require("uuid");
let usersStorage = [];
function getUsers() {
    return usersStorage;
}
function getUser(id) {
    return usersStorage.find((user) => user.id === id);
}
function createUser(userData) {
    const newUser = { id: (0, uuid_1.v4)(), ...userData };
    usersStorage.push(newUser);
    return newUser;
}
function updateUser(id, userData) {
    const index = usersStorage.findIndex((user) => user.id === id);
    if (index !== -1) {
        usersStorage[index] = { id, ...userData };
        return usersStorage[index];
    }
    return null;
}
function deleteUser(id) {
    const index = usersStorage.findIndex((user) => user.id === id);
    if (index !== -1) {
        usersStorage.splice(index, 1);
        return true;
    }
    return false;
}
//# sourceMappingURL=userService.js.map