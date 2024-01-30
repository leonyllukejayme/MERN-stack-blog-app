const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express();
const port = process.env.PORT;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to Database');
		app.listen(port, () => {
			console.log(`Connected to port ${port}`);
		});
	})
	.catch((err) => console.error(err));
