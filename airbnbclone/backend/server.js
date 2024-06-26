const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors package

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://yehtohdekho:abdullah123@airbnb.y21wqou.mongodb.net/?retryWrites=true&w=majority&appName=AirBnb';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

// CORS middleware
app.use(cors());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
  }
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Add this option for MongoDB driver
});

const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      country: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      address: { type: String }
    },
    isHost: { type: Boolean, default: false }, // Indicates if the user is also a host
    dateJoined: { type: Date, default: Date.now },
    profilePicture: { type: String }, // URL or path to the user's profile picture
    // Additional fields as per your application's requirements
    // For example: social media links, bio, preferences, etc.
}));

// Routes
// Get all listings (remove filter by hostEmail)
app.get('/api/getALLlistings', async (req, res) => {
    try {
      const listings = await Property.find();
      res.json(listings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // API Endpoint to Get Reservations by User Email
app.get('/api/UserStays/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  // console.log(userEmail)
  try {
    const reservations = await Reservation.find({ userEmail });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

  // New API endpoint to fetch reservations by host email
app.get('/api/reservations/:hostEmail', async (req, res) => {
  try {
    const { hostEmail } = req.params;
    const reservations = await Reservation.find({ hostEmail });

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});


  // API endpoint to fetch user's name by email
app.get('/api/userName', async (req, res) => {
    const { email } = req.query;
    
    try {
      // Simulate fetching user data from a remote service or database
      const user = User.find(user => user.email === email);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ name: user.name });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Express route to fetch a listing by ID
app.get('/api/listings/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const listing = await Property.findById(id);
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
      res.json(listing);
    } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
// Signup
app.post('/signup', async (req, res) => {
  const { email, password ,phone,name} = req.body;
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: password,phone:phone,fullName:name});
    await newUser.save();
    req.session.userId = newUser._id; // Store user ID in session
    res.status(201).json({ message: 'User signed up successfully.' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to sign up user.' });
  }
});
// Reservation schema and model
const ReservationSchema = new mongoose.Schema({
    listingId: String,
    userEmail: String,
    userName: String,
    userContact: String,
    hostEmail: String,
    checkInDate: String,
    checkOutDate: String,
    guests: Number
  });
const Reservation = mongoose.model('Reservation', ReservationSchema);

// API endpoint to store reservations
app.post('/api/reservations', async (req, res) => {
  try {
    const {
      listingId,
      userEmail,
      userName,
      userContact,
      hostEmail,
      checkInDate,
      checkOutDate,
      guests
    } = req.body;

    const newReservation = new Reservation({
      listingId,
      userEmail,
      userName,
      userContact,
      hostEmail,
      checkInDate,
      checkOutDate,
      guests
    });

    await newReservation.save();
    res.status(201).json({ message: 'Reservation stored successfully' });
  } catch (error) {
    console.error('Error storing reservation:', error);
    res.status(500).json({ error: 'Failed to store reservation' });
  }
});

// Login
// Login route without password encryption (not recommended for production)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      console.log(res)
      req.session.userId = user._id; // Store user ID in session
      res.status(200).json({ message: 'User logged in successfully.' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to log in user.' });
    }
  });
  
// Logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: 'User logged out successfully.' });
  });
});


// Define Schema and Model for Property Listing
const PropertySchema = new mongoose.Schema({
    title : String,
    description : String,
    propertyType: String,
    guestType: String,
    address: String,
    guests: Number,
    bedrooms: Number,
    beds: Number,
    lockType: String,
    bathroomType: String,
    presence: {
      me: Boolean,
      family: Boolean,
      otherGuests: Boolean,
      roommates: Boolean,
    },
    imageLinks: [String],
    price: Number,
    hostEmail: String,
    rating : Number
  });
  
  const Property = mongoose.model('Property', PropertySchema);
  
  app.get('/api/listings', async (req, res) => {
    const { hostEmail } = req.query;
  
    try {
      const listings = await Property.find({ hostEmail });
      res.json(listings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/listings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price } = req.body;
      const updatedListing = await Property.findByIdAndUpdate(id, { title, description, price }, { new: true });
      res.json(updatedListing);
    } catch (error) {
      console.error('Error updating listing:', error);
      res.status(500).json({ error: 'Failed to update listing' });
    }
  });
  
  const messageSchema = new mongoose.Schema({
    listingId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: false },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });

  const Message = mongoose.model('Message', messageSchema);

// Endpoint to clear messages for a listing
app.delete('/api/messages/clear', (req, res) => {
  const { listingId } = req.query;
  messages = Message.filter(msg => msg.listingId !== listingId);
  res.json({ message: 'Messages cleared successfully' });
  // console.log(res)
});

// Fetch messages for a listing
app.get('/api/messages/:listingId', async (req, res) => {
  try {
    const messages = await Message.find({ listingId: req.params.listingId });
    res.json(messages);
    // console.log(messages)
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Store a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { listingId, userEmail, userName, message } = req.body;
    const newMessage = new Message({
      listingId,
      userEmail,
      userName,
      message
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // POST endpoint to handle publishing a listing
  app.post('/api/publishListing', async (req, res) => {
    try {
      const {
        title,
        description,
        propertyType,
        guestType,
        address,
        guests,
        bedrooms,
        beds,
        lockType,
        bathroomType,
        presence,
        imageLinks,
        price,
        hostEmail,
      } = req.body;
  
      // Create new Property document
      const newProperty = new Property({
        title,
        description,
        propertyType,
        guestType,
        address,
        guests,
        bedrooms,
        beds,
        lockType,
        bathroomType,
        presence,
        imageLinks,
        price,
        hostEmail,
        rating : 0,
      });
  
      // Save the property to MongoDB
      await newProperty.save();
  
      // Respond with success message
      res.status(200).json({ message: 'Listing published successfully' });
    } catch (error) {
      console.error('Error publishing listing:', error);
      res.status(500).json({ error: 'Failed to publish listing' });
    }
  });



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
