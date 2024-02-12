#### CRUD API APPLICATION

1. Clone this repository
1. Run `npm install`
1. Run `npm run start:dev` for DEV
1. RUN `npm run start:prod` for PROD


#### Examples

1. get users: `http://localhost:8000/users`
1. get user: `http://localhost:8000/users/aa65f789-bf33-404a-9c56-b836ecb648be`
1. create user: `fetch('http://localhost:8000/users', {  method: "POST", body: '{"age":60,"hobbies":["reading"],"userName":"Leonid"}' })`
1. update user: `fetch('http://localhost:8000/users/aa65f789-bf33-404a-9c56-b836ecb648be', {  method: "PUT", body: '{"age":60,"hobbies":["reading"],"userName":"Leonid"}' })`
1. delete user: `fetch('http://localhost:8000/users/aa65f789-bf33-404a-9c56-b836ecb648be', { method: "DELETE" })`