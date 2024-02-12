import { v4 as uuidv4 } from 'uuid'

export default class User {
    _id: string
    _userName: string
    _age: number
    _hobbies: string[]

    constructor(userName: string, age: number, hobbies: string[]) {
        this._id = uuidv4();
        this._userName = userName;
        this._age = age;
        this._hobbies = hobbies;
    }
}