import http from "http"
import { validate } from 'uuid'

import Users from './users'

const _users = new Users()


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
    const data: any = JSON.parse(body)
    return { status: 201, text: _users.addUser(data.userName, data.age, data.hobbies) }
}

const updateUser = function (url: string, body: string) {
    console.log('update user')
    console.log(`body: ${body}`)
    const id = url.slice(7)
    if (validate(id)) {
        const data: any = JSON.parse(body)
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

const setResponse = (response: http.ServerResponse, status: number, text: string) => {
    console.log(`response status: ${status}`)
    response.writeHead(status);
    console.log(`response text: ${text}`)
    response.end(text);
}

const setNotFoundResponse = (response: http.ServerResponse, request: http.IncomingMessage) => {
    console.log(`request url: ${request.url}`)
    console.log(`request method: ${request.method}`)
    console.log(`resource not found`)
    setResponse(response, 404, "Resource not found")
}

const requestListener = function (req: http.IncomingMessage, res: http.ServerResponse) {
    if (req.url) {
        if (req.url === '/users') {
            // ---   GET USERS ---
            if (req.method === "GET") {
                const { status, text } = getUsers()
                setResponse(res, status, text)
            }
            // ---   CREATE USER ---
            else if (req.method === "POST") {
                var body = "";
                req.on('readable', function () {
                    const read = req.read()
                    if (read)
                        body += read
                });
                req.on('end', function () {
                    const { status, text } = addUser(body)
                    setResponse(res, status, text)
                });
            }
            else { setNotFoundResponse(res, req) }
        }
        else if (req.url?.startsWith('/users/')) {
            // ---   READ USER ---
            if (req.method === "GET") {
                const { status, text } = getUser(req.url)
                setResponse(res, status, text)
            }
            // ---   UPDATE USER
            else if (req.method === "PUT") {

                var body = "";
                req.on('readable', function () {
                    const read = req.read()
                    if (read)
                        body += read
                });
                req.on('end', function () {
                    const { status, text } = updateUser(req.url as string, body)
                    setResponse(res, status, text)
                });
            }
            // ---   DELETE USER
            else if (req.method === "DELETE") {
                const { status, text } = deleteUser(req.url)
                setResponse(res, status, text)
            }

            else { setNotFoundResponse(res, req) }
        }
        else { setNotFoundResponse(res, req) }
    }
    else { setNotFoundResponse(res, req) }

}
export default requestListener