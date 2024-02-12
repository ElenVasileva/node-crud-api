import User from "./user";

export default class Users {
    private _userList: User[];

    constructor() {
        this._userList = [
            // { _id: 'aa65f789-bf33-404a-9c56-b836ecb648be', _age: 10, _hobbies: ['sport', 'music'], _userName: 'Anna' },
            // { _id: '1bb0c4fb-2180-4c1b-bac0-6e07d85bd43b', _age: 20, _hobbies: [], _userName: 'Val' },
            // { _id: '3cda716d-9bc1-43f9-ae5b-0c5815b5e005', _age: 30, _hobbies: ['reading'], _userName: 'Leo' }
        ]
    }

    public getUsers = () => {
        return this._userList
    }

    public getUser = (id: string) => {
        let user: User | null = null
        this._userList.forEach(u => {
            if (u._id === id) {
                user = u
            }
        })
        return user
    }

    public addUser = (userName: string, age: number, hobbies: string[]) => {
        const user = new User(userName, age, hobbies)
        this._userList.push(user)
        return JSON.stringify(user)
    }

    public updateUser = (user: User) => {
        const indexToUpdate = this._userList.findIndex(u => {
            return user._id === u._id
        })
        if (indexToUpdate >= 0) {
            this._userList[indexToUpdate] = user
            return JSON.stringify(user)
        }
        return null
    }

    public deleteUser = (id: string) => {
        const indexToDelete = this._userList.findIndex(user => {
            return user._id === id
        })
        if (indexToDelete >= 0) {
            this._userList.splice(indexToDelete, 1)
            return true;
        }

        return false;
    }

}