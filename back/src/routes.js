const url = require('url')
class Routes {
    #io

    constructor(io){
        this.#io = io
    }

    async post(req, res){

        const { headers} = req
        const {query: {socketId}} = url.parse(req.url, true)
        console.log('chamou', socketId)


        this.#io.to(socketId).emit('file-uploaded', 5e9)
        this.#io.to(socketId).emit('file-uploaded', 5e9)
        this.#io.to(socketId).emit('file-uploaded', 5e9)
        this.#io.to(socketId).emit('file-uploaded', 5e9)
        
         setTimeout(() => { 
             return res.writeHead(303, {
                Connection: 'close',
                Location : `${headers.origin}?msg=Files uploaded with success!`
             }).end()
         }, 2000)
    }
}

module.exports = Routes