const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err}
        error.message = err.message
        console.log(err.message)
        res.status(error.statusCode || 500).json({success: false, message: error.message || 'Internal server error'})
    } catch (error) {
        next(error)
    }
    console.error(err)
}

export default errorMiddleware;