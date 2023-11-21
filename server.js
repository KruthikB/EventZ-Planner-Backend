
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Import event routes
const cors = require('cors');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on('open', () => {
    console.log('Database connected');
});

db.on('error', (err) => {
    console.error('Error in connecting to database', err);
});

app.use(express.json());
app.use(cors());
app.use('/', userRoutes);
app.use('/', eventRoutes); // Use event routes

app.get('/events', async (req, res) => {
    try {
        const events = await EventDetail.find();
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: error.message });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
