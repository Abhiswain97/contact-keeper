const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// serve static assests in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	);
}

app.listen(process.env.PORT || 5000);
