import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS middleware
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

const app = express();
const PORT = 5000;

import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
});

// customer User schema
const customerUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const customerUser = mongoose.model('customerUser', userSchema);

const reminderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  reminderDate: {
    type: Date,
    required: true
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

app.use(bodyParser.json());
// Allow requests from specific origin
const corsOptions = {
  // origin: ['http://localhost:5173'], // Change this to your frontend URL
  origin: ['https://pharmaawatch.netlify.app'], // Change this to your frontend URL
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send JWT as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send JWT as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout endpoint
app.get('/api/logout', verifyToken, (req, res) => {
  res.clearCookie('token'); // Clear JWT cookie
  res.json({ message: 'Logout successful' });
});

// customer end points

// Customer Register endpoint
app.post('/api/customerRegister', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await customerUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new customerUser({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send JWT as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Customer Login endpoint
app.post('/api/customerLogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await customerUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send JWT as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a schema for alerts
const alertSchema = new mongoose.Schema({
  hash: String,
  email: String,
  expiryDate: Date,
  reminderDate: Date
});


// Define a model for alerts
const Alert = mongoose.model('Alert', alertSchema);

// Endpoint to add an alert
app.post('/api/alerts', async (req, res) => {
  try {
    const { hash, email, expiryDate, reminderDate } = req.body;

    // console.log(expiryDate,reminderDate);

    // Check if the hash already exists
    const existingAlert = await Alert.findOne({ hash: hash });

    if (existingAlert) {
      return res.status(400).send('Alert with this hash already exists');
    }

    // Create a new alert
    const alert = new Alert({
      hash,
      email,
      expiryDate,
      reminderDate
    });

    console.log(alert);

    // Save the alert to MongoDB
    await alert.save();

    res.status(201).send('Alert added successfully');
  } catch (error) {
    console.error('Alert already added:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Schedule the job to send email reminders
cron.schedule('* * * * *', async () => {
  try {
    // Find alerts with remainder date equal to current date
    const currentDateTime = new Date();
    const alerts = await Alert.find({ remainderDate: currentDateTime });

    // Send email reminder for each alert
    alerts.forEach(async (alert) => {
      const { hash, email, expiryDate } = alert;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nithinganna200444@gmail.com',
          pass: 'Gnithin@07062004'
        }
      });

      const mailOptions = {
        from: 'nithinganna200444@gmail.com',
        to: email,
        subject: 'Expiry Alert',
        text: `Your product with hash ${hash} is about to expire on ${expiryDate}.`
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });
  } catch (error) {
    console.error('Error scheduling email reminders:', error);
  }
});

app.get("/api/getApi", verifyToken, async (req, res) => {
  try {
    const id = req.userId;

    // Assuming you are using Mongoose to interact with MongoDB
    const user = await customerUser.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the email from the user document
    const { email } = user;

    return res.status(200).json({ data: email });
  } catch (err) {
    console.error('Error retrieving user:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



