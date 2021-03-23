class Routes {
    #io

    constructor(io){
        this.io = io
    }

    async post(req, res){

        const { headers} = req
        console.log('chamou')

        const onFinish = (res, redirectTo) => {
            res.writeHead(303, {
               Connection: 'close',
               Location : `${redirectTo}?msg=Files uploaded with success!`
            })
        }

        return onFinish(res, headers.origin)
    }
}

module.exports = Routes