const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? 500 : res.statusCode;
    res.json({ message: err.message });
};

module.exports = errorHandler;
