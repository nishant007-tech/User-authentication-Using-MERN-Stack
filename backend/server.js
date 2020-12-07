const express = require('express');
const app = express();
const mongoose = require('mongoose');

//we don't actually need body-parser in new version of node js just do that below:
app.use(express.json());
//import Routes
const authRoutes = require('./routes/auth');

//Routes Middlewares
app.use('/api/user', authRoutes);

//connect to db
mongoose.connect('mongodb://localhost/nishant', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('We Are Connected to DB');
});



app.listen(5000, () => console.log("We are connected at Port 5000"));