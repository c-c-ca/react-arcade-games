const requireLogin = require('../middlewares/requireLogin');
const User = require('../models/User');

module.exports = app => {
  app.get('/api/play-stats', async (req, res) => {
    const results = await User.find({});
    res.send(results.map(({ topScore, username }) => ({ topScore, username })));
  });

  app.post('/api/play-stats', requireLogin, async (req, res) => {
    req.user.topScore = Math.max(req.user.topScore, req.body.score);

    const user = await req.user.save();

    res.send(user);
  });
};
