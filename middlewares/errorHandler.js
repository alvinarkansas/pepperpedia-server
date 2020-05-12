module.exports = function (err, req, res, next) {
    console.log('| e | r | r | o | r |', err);
    // console.log(err.errors);
    
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Your email has already registered' })
    } else if (err.name === 'SequelizeValidationError') {
        let message = err.errors.map(error => error.message)
        res.status(400).json({ message })
    } else {
        // console.log('masuk sini nggak? _+_+_+_+');
        // console.log(err.status);
        // console.log(err.message);
        // res.status(err.status).json({ message: err.message })
        res.status(err.status || 500).json(err.message || 'Internal server error')
    }
}
