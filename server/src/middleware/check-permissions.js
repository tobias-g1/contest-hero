const validatePermissions = async (req, res, next) => {

    try {

        // Check if the user who is authenticated matches the author of the contest/entry trying to be created

        if (res.locals.username === req.body.author) {
            return next();
        } else {
            res.send({
                success: false,
                message: 'Unauthorised',
                status: 401
            })
        }

        // Catch the error if any.

    } catch (err) {

        // Send an error message in the response.
        return next({
            status: 401
        });
    }
};

module.exports = validatePermissions;