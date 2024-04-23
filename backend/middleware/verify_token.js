const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log(token)

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user_id = decoded.id;
    next();
  });
};
