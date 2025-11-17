module.exports.successResponse = (req, res, next) => {
    stat = res.locals.status || 200;
    message = res.locals.message || 'Success';
    data = res.locals.data || null;
    
    res.status(stat).json({
        message: message,
        data: data
    });
};