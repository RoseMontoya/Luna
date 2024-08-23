const notFound = (type) => {
    const err = new Error('Not found')
    err.status = 404;
    err.title = 'Not found';
    err.errors = {message: `${type} not found.`}
    return err;
};


module.exports = { notFound}
