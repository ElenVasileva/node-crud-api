import { validate } from 'uuid'

import Users from './users'

const _users = new Users()

const checkAndConvertData = (body: string) => {

    let data: any
    try {
        data = JSON.parse(body)
    }
    catch {
        return { error: { status: 400, text: `body is invalid` }, data: null }
    }
    if (!data.userName) {
        return { error: { status: 400, text: 'body does not contain userName' } }
    }
    if (!data.age) {
        return { error: { status: 400, text: 'body does not contain age' } }
    }
    return { data: data, error: null }
}


const getUsers = function () {
    console.log('get users')
    return { status: 200, text: JSON.stringify(_users.getUsers()) }
}

const getUser = function (url: string) {
    console.log('get users')
    const id = url.slice(7)
    console.log(`id: ${id}`)
    if (validate(id)) {
        const user = _users.getUser(id)
        if (user) {
            return { status: 200, text: JSON.stringify(user) }
        }
        else {
            return { status: 404, text: `record with id = '${id}' doesn't exist` }
        }
    }
    else {
        return { status: 400, text: `userId '${id}' is invalid` }
    }
}

const addUser = function (body: string) {
    console.log('add user')
    console.log(`body: ${body}`)
    const { data, error } = checkAndConvertData(body)
    if (error) {
        return error
    }
    return { status: 201, text: _users.addUser(data.userName, data.age, data.hobbies) }
}

const updateUser = function (url: string, body: string) {
    console.log('update user')
    console.log(`body: ${body}`)
    const id = url.slice(7)
    if (validate(id)) {
        const { data, error } = checkAndConvertData(body)
        if (error) {
            return error
        }
        const updated = _users.updateUser({ _id: id, _userName: data.userName, _age: data.age, _hobbies: data.hobbies })
        if (updated == null) {
            return { status: 404, text: `record with id = '${id}' doesn't exist` }
        }
        else {
            return { status: 200, text: JSON.stringify(updated) }
        }
    }
    else {
        return { status: 400, text: `userId '${id}' is invalid` }
    }
}

const deleteUser = function (url: string) {
    console.log('get users')
    const id = url.slice(7)
    if (validate(id)) {
        if (_users.deleteUser(id)) {
            return { status: 200, text: `record is found and deleted` }
        }
        else {
            return { status: 404, text: `record with id = '${id}' doesn't exist` }
        }
    }
    else {
        return { status: 400, text: `userId '${id}' is invalid` }
    }
}

export { getUsers, getUser, addUser, updateUser, deleteUser }