import http from "http"

import { getUsers, getUser, addUser, updateUser, deleteUser } from './controller'

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
    try {
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
    catch (error) {
        console.log(error)
        setResponse(res, 500, 'Internal Server Error')
    }


}
export default requestListener