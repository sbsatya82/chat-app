import { generateToken } from '../libs/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    //hash password
    if (password < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    if (newUser) {
      //generate jwt token 
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isPasswordTrue = await bcrypt.compare(user.password, password);
    if (!isPasswordTrue) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    generateToken(user._id, res);
    res.json({ message: 'Logged in successfully' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = (req, res) => {

};

export const checkAuth = async(req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("error in check method "+error);
    res.status(500).json({ message: 'Server Error' });
  }
};