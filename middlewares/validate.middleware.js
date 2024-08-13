function validate(schema, path='body') {
    return function (req, res, next) {
        let request = req.body;
        if (path === 'query') {
            request = req.query;
        } else if (path === 'params') {
            request = req.params;
        }

        const { error, value } = schema.validate(request);
        if (error) {
            return res.status(403).send({
                success: false,
                message: error.details[0].message
            });
        }
        req.body = value;
        next();
    }
}

export default validate;


