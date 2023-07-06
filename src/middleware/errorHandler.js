export function errorHandler(err, req, res, next) {
    const status = err.status || 400
    console.log(err)
    res.status(status).json(err.message)
}