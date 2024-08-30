const notFound = (type) => {
    const err = new Error('Not found')
    err.status = 404;
    err.title = 'Not found';
    err.errors = {message: `${type} not found.`}
    return err;
};

const titleCase = (string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

module.exports = { notFound, titleCase}
