const WebSocket = require("ws")
const port = 5000
const server = new WebSocket.Server({
    port
})

let usersPrivate = []
server.on("connection", ws => {
    console.log("connected")
    let id = Date.now()
    let userPrivate = {
        id: id,
        User: ""
    }
    usersPrivate.push(userPrivate)
    ws.on("message", message => {
        const jsonMessage = JSON.parse(message)
        if (jsonMessage.Command === 'ADD_USER') {
            console.log("New Message!!!!!!!!!!!!")
            const response = JSON.stringify({
                Command: 'ADD_USER',
                User: jsonMessage.User
            })
            console.log(response)
            usersPrivate.forEach(user => {
                if (user.id === id) {
                    user.User = jsonMessage.User
                }
            })
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(response)
                }
            })
        }
        if (jsonMessage.Command === 'GET_USERS') {
            console.log("New Message!!!!!!!!!!!!")
            let users = usersPrivate.map(user => user.User)
            const response = JSON.stringify({
                Command: 'GET_USERS',
                Users: users
            })
            console.log(response)
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(response)
                }
            })
        }
        if (jsonMessage.Command === 'NEW_MESSAGE') {
            console.log("New Message!!!!!!!!!!!!")
            const response = JSON.stringify({
                Command: 'NEW_MESSAGE',
                User: jsonMessage.User,
                Msg: jsonMessage.Msg
            })
            console.log(response)
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(response)
                }
            })
        }
    })
    ws.on('close', function () {
        let User = usersPrivate.filter(user => {
            return user.id === id
        })[0].User
        usersPrivate = usersPrivate.filter(user => {
            return user.id !== id
        })
        const response = JSON.stringify({
            Command: 'REMOVE_USER',
            User: User
        })
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(response)
            }
        })
    })
})