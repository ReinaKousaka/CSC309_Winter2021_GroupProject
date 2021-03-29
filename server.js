'use strict';
const log = console.log;

// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '/pub')));


// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

// Collections
const { User } = require('./models/users');

//////////////////////////////////   USER  ////////////////////////////////////
// GET /user/id
app.get('/user/:id', async (req, res) => {
	const id = req.params.id

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const result = await User.findOne({ userID: id }).exec()
		if (!result) {
			res.status(404).send('Resource not found')  
		} else {
			res.send(result)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

// POST /user
app.post('/user', async (req, res) => {
	const user = new User(req.body)

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const result = await user.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') 
		}
	}
})

// PATCH /user/id
app.patch('/user/:id', async (req, res) => {
	const id = req.params.id

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findOne({ userID: id }).exec()
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			for (const [key, value] of Object.entries(req.body)) {
				user[key] = value
			}
			const result = await user.save()
			res.send(result)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') 
		}
	}
})




////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});