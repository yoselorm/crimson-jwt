const express = require('express');
const { login } = require('../controllers/loginAuthController');
const verifyToken = require('../middleware/authTokenMiddleware'); // Corrected import name

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.get('/secured', verifyToken, (req, res) => {
  res.json({ message: 'Protected data is accessed successfully', user: req.user });
});

module.exports = authRouter;
