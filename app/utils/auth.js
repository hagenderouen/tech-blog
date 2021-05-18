const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/user/login');
    } else {
      next();
    }
  };
  
  module.exports = auth;