const notFound = (type) => {
    const err = new Error('Not found')
    err.status = 404;
    err.title = 'Not found';
    if (type === 'Entry') {
        err.errors = {message: 'Entry not found.'}
    }
    return err;
};


module.exports = { notFound}
