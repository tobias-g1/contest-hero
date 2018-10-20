const validatePermissions = async (req, res, next) => {

    try {

        // Check if the user who is authenticated matches the author of the contest/entry trying to be created

        if (res.locals.username === req.body.author) {
            return next();
        } else {
            res.status(401).send()
        }

        // Catch the error if any.

    } catch (err) {

        res.status(500).send()
    }
};

module.exports = validatePermissions;