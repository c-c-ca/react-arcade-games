const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/username', requireLogin, async (req, res) => {
    req.user.username = req.body.username;

    const user = await req.user.save();

    res.send(user);
  });
};
