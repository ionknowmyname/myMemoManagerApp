// ensure you cannot get to dashboard if you are not logged in
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ msg: "Access denied. Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

        /* jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);

            req.user = user;
            next();
        }); */
    } catch (ex) {
        res.status(400).json({ msg: "Invalid token." });
    }
};

/*   // FORMER AUTHENTICATION

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

*/
