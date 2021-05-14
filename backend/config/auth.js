// ensure you cannot get to dashboard if you are not logged in

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        // req.flash('success_msg', 'Please login to view this page')

        return res.status(401).json({ msg: "Access denied. Unauthorized" });

        // res.redirect('/users/login')
    },
};
