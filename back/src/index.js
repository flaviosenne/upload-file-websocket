const http = require('http')
const socketIo = require('socket.io')
const Routes = require('./routes')
const PORT = 3000

const handler = function(req, res){
    const defaultroute = async (req, res) => res.end('Hello')
    
    const routes = new Routes(io)
    const chosen = routes[req.method.toLowerCase()] || defaultroute
    
    return chosen.apply(routes, [req, res])    
    
}

const server = http.createServer(handler)
const io = socketIo(server, {
    cors: {origin: "*", credentials: false}
})

io.on("connection", (socket) => console.log('someone connected', socket.id))
// const interval = setInterval(() => {
//     io.emit('file-uploaded', 5e6)

// }, 250)

const startServer = () => {
    const {address, port} = server.address()
    console.log(`App running http://${address}/${port}`)
}

server.listen(PORT, startServer)