const handleParserError = () => {
    return (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            if (err.type === 'entity.parse.failed') {
                let data = req.body || req.query;
                try {
                    JSON.parse(data);
                } catch (error) {
                    let message = error.toString().split("\n")[0];
                    return res.http.BadRequest({ error: {errorType: err.type, message: message }});
                }
            }            
            else return res.http.BadRequest(err);
        }
        next();
    };
};

module.exports = handleParserError