const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const upload = require('express-fileupload');

const app = express();
const port = process.env.PORT;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to Database');
		app.listen(port, () => {
			console.log(`Connected to port ${port}`);
		});
	})
	.catch((err) => console.error(err));
