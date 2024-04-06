const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt.js for password hashing
const User = require('../models/UserModel')



// dont vex reading the code I just like to comment....lormy
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login request for username:', username); 

    // Find user by username
    const user = await User.findOne({ username });

    console.log('Found user:', user); 

    // Check if user exists
    if (!user) {
      console.log('User not found for username:', username); 
      return res.status(401).json({ message: 'Invalid username' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for username:', username); 
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Set cookie with token
    res.cookie('token', accessToken, {
      httpOnly: true,
    });

    // Respond with success message
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error occurred during login:', error); // Add this line to log any errors that occur
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
