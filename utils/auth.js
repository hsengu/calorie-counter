const withAuth = (req, res, next) => {      // Checks if user is logged in
    if(!req.session.user_id) {
        res.redirect('/signin');
    } else {
        next();
    }
};

module.exports = withAuth;