const User = require('../public/models/UserModel');
const bcrypt = require('bcryptjs'); // Import bcrypt.js for password hashing


// Create a new user

const createUser = async () => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('testpassword', 10); // Hash with a salt of 10 rounds

    // Create a new user with the hashed password
    const user = new User({
      username: 'testuser',
      password: hashedPassword, // Store the hashed password in the database
    });

    // Save the user to the database
    await user.save();
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

module.exports = { createUser };
