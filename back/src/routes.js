const url = require('url')
const UploadHandler = require('./uploadHandler')
const { pipelineAsync, logger} = require('./util')

class Routes {
    #io

    options(req, res){
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        }).end()
    }
    constructor(io) {
        this.#io = io
    }

    async post(req, res) {

        const { headers } = req
        const { query: { socketId } } = url.parse(req.url, true)

        const upload = new UploadHandler(this.#io, socketId)
        
        const onFinish = (res, redirectTo) => () => {
            res.writeHead(303, {
                Connection: 'close',
                Location: `${redirectTo}?msg=Files uploaded with success!`
            }).end()
        }

        const busboyInstance = upload.registerEvents(headers, onFinish(res, headers.origin))

        await pipelineAsync(
            req,
            busboyInstance
        )

        logger.info('Request finished with success')

    }
}

module.exports = Routes